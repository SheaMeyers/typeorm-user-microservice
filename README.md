# TypeORM User Microservice

A microservice to manage users built in TypeORM. (https://typeorm.io/#/)

### Requirements

1. Docker (https://www.docker.com/get-started)
2. Docker-compose (https://docs.docker.com/compose/)
3. Npm (https://nodejs.org/en/download/)

### Steps to run this project:

1. Clone the repository `git clone https://github.com/SheaMeyers/typeorm-user-microservice.git`
2. Go into the new project directory `cd typeorm-user-microservice/`
3. Run `docker-compose up`
4. That's it!  The project is running!  You should now have two docker containers running:  
    - A web container that contains your running TypeScript code
    - A postgres container that contains your database
5. To verify the project is running as expected go to http://localhost:3000/users. 
    You should see 3 test users that were created when the project started. 
    
### Usage

#### Get all users

In your brower go to the url http://localhost:3000/users

Or run the following curl command

`
curl -X GET \
  http://localhost:3000/users/ \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: 782bf153-fea3-4d5c-a8e5-a1e337dee303,15cd5272-7729-46f1-934f-460492bb17af' \
  -H 'User-Agent: PostmanRuntime/7.15.0' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache'
`

Or in Postman make a GET call to http://localhost:3000/users/

#### Get a user by id

In your brower go to the url http://localhost:3000/users/1/

Or run the following curl command

`
curl -X GET \
  http://localhost:3000/users/1/ \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: 45ec7f14-4963-47c7-b026-4fd0a3ba0dfc,d77cc7b0-ce7f-4326-9e64-167df0a21f41' \
  -H 'User-Agent: PostmanRuntime/7.15.0' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache'
`

Or in Postman make a GET call to http://localhost:3000/users/1/

#### Create a user

Note: Only the `userName` and `password` are required.  `firstName` and `lastName` are optional

Run the following curl command

`
curl -X POST \
  http://localhost:3000/users \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: f7f7290c-a79f-4b23-bf2b-352fb5dc18a9,9db02019-ce51-4450-8d5f-b9d05b21c4f6' \
  -H 'User-Agent: PostmanRuntime/7.15.0' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache' \
  -H 'content-length: 95' \
  -d '{
	"userName": "SheaTest",
	"password": "password",
	"firstName": "Shea",
	"lastName": "Test"
}'
`

or in Postman make a POST call to http://localhost:3000/users with the body

`
{
	"userName": "SheaTest",
	"password": "password",
	"firstName": "Shea",
	"lastName": "Test"
}
`

### Notes

- Password are stored encrypted using bcryptjs https://www.npmjs.com/package/bcryptjs 
- Avatars are stored in the filesystem using a docker volume (https://docs.docker.com/storage/volumes/)
- 3 test users are created when the program is launched
- Only the `userName` and `password` are required to create a user.  
    `firstName`, `lastName`, and `avatar` are optional.
   
### Future considerations

- Change the ids to uuid or some other form of id that is not easily predicable.  
If a user knows their own id it is easy to guess the ids of other users.
- Production build and settings.  Currently this is only setup for development purposes.
- Add update endpoint.  Users should be able to update their information but at the moment this would not be possible.
- Error handling.  Improve the error handling so users get useful error message.
  