library(tidyverse)
library(plotly)
colleges <- read_csv("C:/Users/valamuri/Desktop/VF/Vision/MERGED2019_20_PP.csv")

# finding average act score from 
act_mid_cols <- c("ACTCMMID", "ACTENMID", "ACTMTMID")

colleges[act_mid_cols] <- lapply(colleges[act_mid_cols], as.numeric)
colleges$ACT_AVG <- rowMeans(colleges[act_mid_cols], na.rm=T)

colleges <- colleges[complete.cases(colleges), ]
colleges[act_mid_cols]

# variables of interest for analysis are: Institute name, ACT avg, SAT avg, Admission Rate, State
colleges_oi <- colleges %>% 
  select(INSTNM, ACT_AVG, SAT_AVG, ADM_RATE, STABBR)

colleges_oi[2:4] <- lapply(colleges_oi[2:4], as.numeric)
colleges_oi <- colleges_oi[complete.cases(colleges_oi), ]

# colleges of interest: cleaned of null values, reduced to variables of interest
colleges_oi

write.csv(colleges_oi, "./colleges_of_interest.csv")

# average SAT vs ACT 
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  arrange(ACCEPTANCE) %>% 
  ggplot(aes(x=SAT_AVG, y=ACT_AVG)) +
  geom_point(size = 3, alpha=1, color="lightblue")+
  geom_point(shape = 1,size = 3,colour = "blue", alpha=0.5)+
  xlim(min(colleges_oi$SAT_AVG) - 100, 1600)+
  ylim(min(colleges_oi$ACT_AVG) - 3, 36) +
  geom_smooth(method = lm, se=F, color="coral")+
  labs(title = "Average SAT vs ACT scores", x="SAT", y="ACT")+
  theme_bw()+
  theme(text = element_text(size=15))
  
ggsave("ACT_vs_SAT.png")

# average SAT vs ACT (interactive plot that shows institution name on hover)
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  arrange(ACCEPTANCE) %>%
  plot_ly(x=~SAT_AVG, y=~ACT_AVG, name = ~INSTNM)

# average ACT vs acceptance rate
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  arrange(ACCEPTANCE) %>%
  filter(ACCEPTANCE < 40) %>% 
  plot_ly(x=~ACT_AVG, y=~ACCEPTANCE, name = ~INSTNM) %>% 
  layout(title = "Average ACT vs Acceptance Rate", xaxis=list(title="ACT average"),
         yaxis=list(title = "Acceptance Rate (%)"), plot_bgcolor = "#e5ecf6")
  
# average ACT by state
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  group_by(STABBR) %>% 
  summarise(ACT = mean(ACT_AVG), count=n()) %>%
  ggplot(aes(x=STABBR, y=ACT, color=STABBR)) +
  geom_point(size=3)+
  labs(title="Average ACT score by state", x="State", y="ACT", fill="State")+
  theme_bw()+
  scale_y_continuous(breaks = round(seq(min(colleges_oi$ACT_AVG), max(colleges_oi$ACT_AVG), by = 1)))+
  theme(legend.position = "none", panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                        colour = "darkgrey"), 
        panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                        colour = "darkgrey"))+
  theme(text = element_text(size=15))

ggsave("average_ACT_by_state.png", width = 15, height = 8)

# average ACT score distribution by state
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  ggplot(aes(x=STABBR, y=ACT_AVG)) +
  geom_boxplot()+
  geom_point(size=3, alpha=0.5)+
  labs(title="Average ACT score distribution by state", x="State", y="ACT", fill="State")+
  theme_bw()+
  scale_y_continuous(breaks = round(seq(min(colleges_oi$ACT_AVG)-37, max(colleges_oi$ACT_AVG), by = 4)))+
  theme(legend.position = "none", panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                        colour = "darkgrey"), 
        panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                        colour = "darkgrey"))+
  theme(text = element_text(size=15))

ggsave("Avg_ACT_distribution_by_state.png", width = 15, height = 8)

# average SAT by state
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  group_by(STABBR) %>% 
  summarise(SAT = mean(SAT_AVG), count=n()) %>%
  ggplot(aes(x=STABBR, y=SAT, color=STABBR)) +
  geom_point(size=3)+
  labs(title="Average SAT score by state", x="State", y="SAT", fill="State")+
  theme_bw()+
  scale_y_continuous(breaks = round(seq(min(colleges_oi$SAT_AVG)-37, max(colleges_oi$SAT_AVG), by = 50)))+
  theme(legend.position = "none", panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                        colour = "darkgrey"), 
        panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                        colour = "darkgrey"))+
  theme(text = element_text(size=15))

ggsave("average_SAT_by_state.png", width = 15, height = 8)

# average SAT distribution by state
colleges_oi %>% 
  mutate(ACCEPTANCE = ADM_RATE * 100) %>% 
  select(-ADM_RATE) %>% 
  ggplot(aes(x=STABBR, y=SAT_AVG)) +
  geom_boxplot()+
  geom_point(size=3, alpha=0.5)+
  labs(title="SAT score distribution by state", x="State", y="SAT", fill="State")+
  theme_bw()+
  scale_y_continuous(breaks = round(seq(min(colleges_oi$SAT_AVG)-37, max(colleges_oi$SAT_AVG), by = 50)))+
  theme(legend.position = "none", panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                        colour = "darkgrey"), 
        panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                        colour = "darkgrey"))+
  theme(text = element_text(size=15))


ggsave("Avg_SAT_distribution_by_state.png", width = 15, height = 8)
