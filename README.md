Sci Solvers
===========

Things I noticed during import that might need fixing:

* I was warned attr_accessible was deprecated in Rails 4, and used the workaround of including 'protected_attributes' in the Gemfile. This should probably be fixed properly for the Rails 4 way of doing things.
* I had to change the 'match' in the provider callback in routes.rb to 'get', but I'm not sure if this should be get, post or both (used by devise/omniauth I think). Probably easy enough to test which it should be.

Things that definitely need doing:

* Change branding from Games Freelancers to Sci Solvers
* Make a new Facebook app for this project
* Other project TODOs
