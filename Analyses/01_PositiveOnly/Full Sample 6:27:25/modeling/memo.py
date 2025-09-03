from memo import memo
import jax
import jax.numpy as jnp
from enum import IntEnum

# --- Domains & Primitives -----------------------------------------------------------------
class Object(IntEnum):
    GROUPPHOTOS = 0

class Persona(IntEnum):
    PROGRESSIVE = 0
    CONSERVATIVE = 1

class Utterance(IntEnum):
    CROWDCLOAKING = 0
    HERDBLURRING = 1

utterance_costs = {
    Utterance.CROWDCLOAKING: 9.0,
    Utterance.HERDBLURRING: 3.0
}


# --- Combined referential + social semantics ---------------------------------
@jax.jit 
def meaning_comb(utterance, obj, persona):
    """
    Returns True if utterance is 'true' of BOTH the referential target (object)
    and the social target (persona).
    Shape: [Utterance, Object, Persona]
    """
    return jnp.array([
        # Utterance: CROWDCLOAKING
        [
            # Object: GROUPPHOTOS
            [True,  False]  # Progressive = True, Conservative = False
        ],
        # Utterance: HERDBLURRING
        [
            # Object: GROUPPHOTOS
            [False, True]   # Progressive = False, Conservative = True
        ]
    ])[utterance, obj, persona]

# --- Literal listener: L0 ----------------------------------------------------
@memo
def L0[_u: Utterance, _o: Object, _p: Persona]():
    listener: knows(_u)
    # choose an object (uniform for now)
    listener: chooses(o in Object, wpp=1.0)
    # choose a persona, weighted by whether utterance is true of (object, persona)
    listener: chooses(p in Persona, wpp=meaning_comb(_u, o, p))
    return Pr[listener.o == _o, listener.p == _p]

@memo
def S1[_u: Utterance, _o: Object, _p: Persona](alpha: float):
    speaker: knows(_o, _p)
    # choose an utterance weighted by informativeness, which considers both social and referential eaning as well as cost
    speaker: chooses(u in Utterance,wpp=exp(alpha * (log(L0[u, _o, _p]())-1) - utterance_costs[u]))
    return Pr[speaker.u == _u]



# --- Define tests ----------------------------------------------------
def test_literal_listener(utterance):
    print(f"\nLiteral listener interpretation of '{utterance.name}':")
    outcomes = L0()
    for obj in Object:
        for per in Persona:
            prob = outcomes[utterance][obj][per]
            print(f"P({obj.name}, {per.name} | '{utterance.name}') = {prob:.3f}")

def test_pragmatic_speaker(alpha=1.0):
    print(f"\nPragmatic speaker production with alpha={alpha}:")
    for u in Utterance:
        for o in Object:
            for p in Persona:
                prob = S1(alpha)[u, o, p] 
                print(f"P({u.name} | {o.name}, {p.name}) = {prob:.3f}")
# --- Run tests ---------------------------------------------------------------
test_literal_listener(Utterance.CROWDCLOAKING)
test_literal_listener(Utterance.HERDBLURRING)

test_pragmatic_speaker(alpha=1)