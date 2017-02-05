#models
* Sets up tips, comment, user schema
* Note: user.js deals with authentication
 
#routes 
* tips: 
* Comments: 
    -NEW: access the tip where the person can comment
    -CREATE: create the new comment for the database
    -EDIT: show the edit page for comment
    -UPDATE: updates a specific comment
    -DESTROY: delete particular comment user must have created the comment
* Index:
    - HOME PAGE: display home page
    
# Seeds:
* Creates an array of data
* Removes the data & creates new tip and comment

# Header:
* Uses bootstraps-> navbar [signup, login, logout]
* If the user is logged in displays '"Welcome" + user '
* Checks the error and success flash functions


# Views:
    *Tips:
        -EDIT:
            ~contains the name and image and description where you can edit[form:update route]
        -INDEX:
            ~displays all the tips 
        -NEW:
            ~displays the form for new tip[Create route]
