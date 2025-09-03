# Load necessary libraries
library(tidyverse)

# Load the dataset
data <- read.csv("sociopoliticalfrequency_tradeoff_right-merged.csv")

# Inspect the response column to understand its structure
# Example format: {'CNNBias': '62', 'FoxBias': '69', 'NPRBias': '58'}
data$response <- as.character(data$response)  # Ensure it's treated as text

# Parse the response column into separate columns for sliding scales
parsed_responses <- data %>% 
  mutate(response_parsed = map(response, ~ tryCatch(jsonlite::fromJSON(.), error = function(e) NULL))) %>% 
  unnest_wider(response_parsed)

# Select relevant columns for summarization
cleaned_data <- parsed_responses %>% 
  select(item, CNNBias, FoxBias, NPRBias) %>% 
  mutate(
    CNNBias = as.numeric(CNNBias),
    FoxBias = as.numeric(FoxBias),
    NPRBias = as.numeric(NPRBias)
  )

# Summarize data by item
summary_by_item <- cleaned_data %>% 
  group_by(item) %>% 
  summarize(
    mean_CNNBias = mean(CNNBias, na.rm = TRUE),
    mean_FoxBias = mean(FoxBias, na.rm = TRUE),
    mean_NPRBias = mean(NPRBias, na.rm = TRUE),
    count = n()
  ) %>% 
  arrange(desc(count))

# Save the summary table to a CSV file
write.csv(summary_by_item, "summary_by_item.csv", row.names = FALSE)

# OPTIONAL: Visualize the bias values by item using ggplot
summary_by_item %>% 
  pivot_longer(cols = starts_with("mean_"), names_to = "bias_type", values_to = "mean_value") %>% 
  ggplot(aes(x = item, y = mean_value, fill = bias_type)) +
  geom_col(position = "dodge") +
  theme_minimal() +
  labs(
    title = "Mean Bias Scores by Item",
    x = "Item",
    y = "Mean Bias Score",
    fill = "Bias Type"
  ) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
