import random, time

maleNames = ['Michael', 'Jacob', 'Matthew', 'Joshua', 'Christopher']
random.shuffle(maleNames)

femaleNames = ['Emily', 'Hannah', 'Sally', 'Sarah', 'Jessica']
random.shuffle(femaleNames)

neutralNames = ['Alex', 'Sam', 'Taylor', 'Charlie', 'Sage']
random.shuffle(neutralNames)

allNames = ['Michael', 'Jacob', 'Matthew', 'Joshua', 'Christopher', 'Emily', 'Hannah', 'Sally', 'Sarah', 'Jessica', 'Alex', 'Sam', 'Taylor', 'Charlie', 'Sage']
random.shuffle(allNames)

criticalProfessions = ['is a dentist.', 'is an electrician.', 'is an optometrist.', 'is a piano player.', 'is a taxi driver.', 'is a journalist.', 'is an artist.', 'is a drummer.', 'is a receptionist.', 'is a florist.']
random.shuffle(criticalProfessions)

ceilingProfessions = ['is a teacher.', 'is a gardener.', 'is an accountant.', 'is a judge.', 'is a lawyer.']
random.shuffle(ceilingProfessions)

allProfessions = ['is a dentist.', 'is an electrician.', 'is an optometrist.', 'is a piano player.', 'is a taxi driver.', 'is a journalist.', 'is an artist.', 'is a drummer.', 'is a receptionist.', 'is a florist.', 'is a teacher.', 'is a gardener.', 'is an accountant.', 'is a judge.', 'is a lawyer.']
random.shuffle(allProfessions)

pronouns = ['She', 'He']

studiedAt = ['studied theatre arts at Harvard University.', 'studied English literature at Oxford.', 'studied linguistics at Edinburgh University.', 'studied cognitive science at Stanford.', 'studies chemistry at the University of Washington.', 'studies business at Northwestern.', 'studies education at the National Autonomous University of Mexico.', 'studies biology at the University of Capetown.', 'studied mechanical engineering at the National University of Singapore.', 'studied culinary arts at the University of Bologna.']
random.shuffle(studiedAt)

thingsIDo = ['I work with diverse populations.', 'I have increased membership retention by 130%.', 'I collaborate with investors and clients.', 'I have led teams of more than 300 employees.', 'I oversee dentists in training.', 'I can play pop, jazz, and rock music.', 'I have won three awards for my screenplays.', 'I am trained in DNA analysis.', 'I learned how to prune rosebushes.', 'I trained under Director Chambers of the San Diego Symphony.']
random.shuffle(thingsIDo)

coin3 = ["heads", "tails", "spine"]

coin2 = ["heads", "tails"]

stimCount = 0

class sentence: 
    def __init__(self, id, subj, pred, subj_gen, predType, dataType, text):
        self.id = id
        self.subj = subj
        self.pred = pred
        self.text = text
        self.subj_gen = subj_gen
        self.predType = predType
        self.dataType = dataType

criticalData = []

# Counters for professions
critical_count = 0
ceiling_count = 0

for stim in range(15):

    #Determine Name and Gender
    subj = allNames.pop()
    if subj in maleNames:
        subj_gen = "m"
    elif subj in femaleNames:
        subj_gen = "f"
    elif subj in neutralNames:
        subj_gen = "n"
    else:
        print('error: gender not found')
    
    pred = allProfessions.pop()
    if pred in criticalProfessions:
        predType = "critical"
        dataType = "critical"
    elif pred in ceilingProfessions:
        predType = "ceiling"
        dataType = "critical"

    text = subj + " " + pred
    stim = sentence(
        subj=subj,
        pred=pred,
        text=text,
        subj_gen=subj_gen,
        predType=predType,
        dataType=dataType,
        id=stimCount
    )
    
    # Append the sentence to criticalData and increment stimCount
    print(stim.text)
    criticalData.append(stim)
    stimCount += 1

print(len(criticalData))

# # Loop until 15 target sentences are generated
# while len(criticalData) < 15:

#     #Randomly select subject gender
#     genderFlip = random.choice(coin3)
    
#     if genderFlip == "heads" and len(maleNames) != 0:
#         subj = maleNames.pop()
#         subj_gen = "m"
#         print("male hit!")
#     elif genderFlip == "tails" and len(femaleNames) != 0:
#         subj = femaleNames.pop()
#         subj_gen = "f"
#     elif genderFlip == "spine" and len(neutralNames) != 0:
#         subj = neutralNames.pop()
#         subj_gen = "n"
#     elif len(maleNames) == 0 and len(femaleNames) == 0 and len(neutralNames) == 0:
#         break
#     else:
#         print("skipping loop: gender failure")
#         continue
    
    
#     # Ensure 10 critical and 5 ceiling professions

#     #Randomly select predicate type
#     predicateFlip = random.choice(coin2)

#     if predicateFlip == "heads" and critical_count < 10 and len(criticalProfessions) != 0:
#         pred = criticalProfessions.pop()
#         predType = "critical"
#         dataType = "critical"
#         critical_count += 1
#     elif predicateFlip == "tails" and ceiling_count < 5 and len(ceilingProfessions) != 0:
#         pred = ceilingProfessions.pop()
#         predType = "ceiling"
#         dataType = "critical"
#         ceiling_count += 1
#     elif len(criticalProfessions) == 0 and len(ceilingProfessions) == 0:
#         break
#     else:
#         print("skipping loop: professional failure")
#         continue  
    
#     # Create the sentence object
#     text = subj + " " + pred
#     stim = sentence(
#         subj=subj,
#         pred=pred,
#         text=text,
#         subj_gen=subj_gen,
#         predType=predType,
#         dataType=dataType,
#         id=stimCount
#     )
    
#     # Append the sentence to criticalData and increment stimCount
#     print('successfully created stim')
#     criticalData.append(stim)
#     stimCount += 1

# print(len(criticalData))

# for stim in criticalData:
#     print(stim.text)


# # fillerData = []

# # fillerStimCount = 0

# # while len(studiedAt) > 0:

# #     #Randomly select gender for pronoun
# #     subj = random.choice(pronouns)
# #     if subj == "She": 
# #         subj_gen = "f"
# #     elif subj == "He":
# #         subj_gen = "m"
    
# #     pred = studiedAt.pop()

# #     text = subj + " " + pred
    
# #     stim = sentence(
# #         subj = subj,
# #         subj_gen = subj_gen,
# #         pred = pred,
# #         predType = "studiedAt",
# #         dataType = "filler",
# #         text = text,
# #         id = fillerStimCount
# #     )

# #     fillerData.append(stim)


# # for stim in fillerData:
# #     print(stim.text)


# # #Next thing to do is select a profession, append them, and then create the text value. Also need to define subj_gen based on that if statement series, and the pred_type based on whether or not the form of the spanish profession ends in a neutral ending (-ista, -ante). Data type refers to critical here.
