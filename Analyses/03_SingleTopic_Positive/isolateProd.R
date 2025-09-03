```{r}
# target words (original case preserved)
target_words <- c("Churako","Domari","Thumaze","Wenlure",
                  "Interforme","Tessamorph","Crowdcloaking","Herdblurring")

# Function to extract matched target words in a single attempt string
process_attempt_targets <- function(attempt_string) {
  words <- str_split(attempt_string, "\\s+")[[1]]
  results <- map_chr(words, function(w) {
    cleaned_word <- tolower(str_replace_all(w, "^[[:punct:]]+|[[:punct:]]+$", ""))
    if (cleaned_word == "") return(NA_character_)
    
    distances <- stringdist(cleaned_word, tolower(target_words), method = "lv")
    min_dist <- min(distances)
    
    if (min_dist <= 2) {
      target_words[which.min(distances)]
    } else {
      NA_character_
    }
  }) %>% 
    discard(is.na) %>% 
    unique()
  
  if (length(results) == 0) return(NA_character_)
  paste(results, collapse = ", ")
}

result <- fullData %>%
  filter(category == "tweet_production") %>% 
  # keep all original columns, so don't select here
  mutate(
    partitionedAttempts = str_split(attempts, ", ['\"]"),
    AttemptMatches = map(partitionedAttempts, ~ map_chr(.x, process_attempt_targets))
  ) %>%
  rowwise() %>%
  mutate(
    firstAttemptIdx = which(!is.na(AttemptMatches))[1],
    firstAttemptTargets = if (!is.na(firstAttemptIdx)) AttemptMatches[[firstAttemptIdx]] else NA_character_
  ) %>%
  ungroup() %>%
  select(everything(), firstAttemptTargets)   # keep all original + new column 
filter(!is.na(firstAttemptTargets) & !str_detect(firstAttemptTargets, ","))


# First: make sure both are character and lowercase-safe
result <- result %>%
  mutate(firstAttemptTargets = tolower(firstAttemptTargets))

result %>% 
  mutate(
    itemPair = case_when(
      required_word_1 %in% c("Churako", "Domari") ~ "martialArts",
      required_word_1 %in% c("Thumaze", "Wenlure") ~ "drugs",
      required_word_1 %in% c("interforme", "tessamorph") | required_word_2 %in% c("interforme", "tessamorph") ~ "tattoos",
      required_word_1 %in% c("crowdcloaking", "herdblurring") ~ "privacy",
      TRUE ~ "error"
    ),
    partitionedAttempts_str = map_chr(partitionedAttempts, ~ paste(.x, collapse = " | ")),
    AttemptMatches_str = map_chr(AttemptMatches, ~ paste(.x, collapse = " | ")),
    firstAttemptTargets_str = as.character(firstAttemptTargets)
  ) %>% 
  select(workerid, partitionedAttempts_str, itemPair, AttemptMatches_str, firstAttemptTargets_str) %>% 
  write_csv("production_data_export_old.csv")

token_lookup <- token_lookup %>%
  mutate(criticalTerm = tolower(criticalTerm))

# Join and filter to match the target word
joined_data <- token_lookup %>%
  left_join(result %>% select(workerid, firstAttemptTargets), by = "workerid") %>%
  filter(criticalTerm == firstAttemptTargets)

joined_data <- joined_data %>% 
  mutate(wingBias = ifelse(wingBias == "right","Republican","Democrat"),
         alignment = ifelse(wingBias == ProlificPolitical,"Aligned","Disaligned")) %>% 
  left_join(patternLookup, by = "workerid")
```