Feature: Learner finds content item
  Learner needs to be able to search and find content items using the search bar

  Background:
    Given I am signed in to Kolibri as a Learner user
      And There is a channel <channel> imported on the device
      And I am on any of the *Learn* tabs

  Scenario: Find a specific content item using the search bar
    When I enter the <search_term> in the search field
     And I press the ENTER key or click the search icon button
    Then I see the *Results for '<search_term>'* page

  Scenario: Clear the previous search
    Given that I've writen something in the search field
      When I use the TAB key to focus the *Clear* button 
        And I press ENTER
          Or I click/tap the *Clear* button directly
      Then I see the search field is empty

  Scenario: Filter search results
    When I open the *Type* filter and select a type
    Then I see the results are filtered
    When I open the *Channels* filter and select a channel
    Then I see the results are filtered even more
    When I click the *X* (clear) button
    Then the search field is empty
      And I can write the new search term
      But I can still see the results of the previous search

  Scenario: Browse locations for the multiple search results
    Given there is a search result item that is present in various channels and/or locations
    When I click the *N locations* link on one of the items
    Then I see the *Locations* modal
      And I see the list of links to N locations where the search result item is present
    When I click one of the links
    Then I see the content item page on that specific location
    When I click the browser back button 
    When I click *Close*
    Then the modal closes 


Examples:
  | search_term |
  | cosine      |