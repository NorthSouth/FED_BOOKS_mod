# FED_BOOKS (updated, v4)
Extended version of the FED book app with enhanced functionality

1. **Sort functionality**: arrange data by author and title
2. **Show/hide books**: button to toggle display of books - set the initial display parameter to 2 in order to accommodate available data
3. **Modal window**: *more info* button brings up a modal window with additional information about the selected book, including:
   1. description
   2. pricing (if available)
   3. link to open a new tab that directs user to a site to purchase the book (if for sale)
4. **Controlled Data Output**: because of pontentially limited display areas, truncated long titles and aggregated multiple authors under *et al*
### (update 2)
5. **Load JSON file directly**: utilize axios js library to handle access to locally-stored JSON file
6. **Changed landing page to show image before results are displayed**: The site initially displays a default image prior to the user selecting how to sort bok data
### (update 3)
7. **vue component refactor**: added in additional modularity and streamlined index.html by refactoring modal as a vue component
### (update 4)
8. **universal modal refactor**: consolidated code into a single, universal modal vue component for additional streamlining by reducing redundancy
