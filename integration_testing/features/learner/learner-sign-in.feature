Feature: Learner sign-in
    Learners should be able to sign in to access Kolibri
    If the simplified sign-in setting is on, learner should be able to login only with the username
    If the learner account is registered correctly, they should arrive at the *Learn > Classes* page upon sign-in

  Background:
    Given that I am on the Kolibri sign-in page
      And that there is a registered learner <username> with password <password>

  Scenario: Normal sign-in
    When I fill out my username <username>
      And I fill out my password <password>
      And I click the *Sign in* button 
    Then I am signed in and I can see the *Learn > Classes* page

  Scenario: Simplified sign-in
    Given that simplified sign-in facility setting is on
    When I fill out my username <username>
      And I click the *Sign in* button 
    Then I am signed in and I can see the *Learn > Classes* page

  Examples:
  | username | password |
  | learner  | learner  |
