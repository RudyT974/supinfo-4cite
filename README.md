# supinfo-4cite

Typescript 4CITE project for SUPINFO.

## Authorization

### RBAC

Admin :

- Can do everything
- Can create, update and delete an hotel {id, name, location, description, and picture_list}

Employee :

- Can read user informations
- You can only update yourself

User :

- Normal users cannot read information about another user
- Can read his informations
- You can only update yourself
- All Write endpoints need the request to be authenticated (stateless)

Guest :

- Can register
- All Read endpoints of hotel data are non-logged/anonymous
