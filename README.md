## Prospectus
A resume reviewing portal for college students to share and get feedback on their resumes

## Instructions to Run

1. Create a empty folder. This is where you will be launching the project from.
2. Once your folder is created navigate to your desired IDE and open this folder
3. Then, open the terminal navigate to your current directory
4. Once in your current directory clone this git respository using this command:
   - `git clone https://github.com/aroy23/Prospectus.git`
5. Now you must install all the dependencies type these commands in order:
   - `cd Prospectus/prospectus`
   - `npm run install-all`
6. Now you have to create a MongoDB Account to act as the database:
     - First, visit `https://account.mongodb.com/account/login` and create an account
    - Next, visit `https://cloud.mongodb.com/` and create a cluster, choose the free plan
    - Name the cluster `prospectus`, choose the provider as `AWS`, select the region closest to your location, and click `create deployment`
    - Once this is done a menu will pop up. In this menu click `Allow Access from Anywhere` and click `Add IP Address`
    - Next, set a username and password. **WRITE DOWN YOUR CREDENTIALS SOMEWHERE** you will need them later
    - Now your database is set up
7. Navigate back to your IDE now you will create your .env file
8. Make sure you are in this directory `(Your Root Folder)/Prospectus/prospectus/` and type these commands in order
    - `cd server`
    - `touch .env`
9. Expand your server folder and now you will see your .env file that you just created
10. Inside this .env file paste the following. You must replace `(name)` and `(password)` with the database credentials you created and wrote down earlier:
```
PORT=8080
MONGO_URI=mongodb+srv://(name):(password)@prospectus.pbsaq.mongodb.net/prospectus?retryWrites=true&w=majority&appName=prospectus  
```
11. Now your all set and all that's left is to run the app. Run these commands assuming you are still in the server folder
    - `cd ..`
    - `npm start`
12. Follow the link that pops up in your terminal in any web browser and now the app should be running!
## Help I Have a Network Error!
If you get a network error when launching the website this may be an issue related to your ports. Here is how you can fix this
   - Expand the `server` folder. You need to modify two files: `server.js and .env`
   - Inside `.env` change `PORT=8080` to any free port on your network. Remember this port
   - Inside `server.js` go to line 15 and change `5173` to any other free port on your network. This cannot be the same number from the previous step
   - Next, expand the `client` folder and then expand the `src` folder. You need to modify the file `config.js`
   - Inside this file on line 1, change the port to match the number that you set the port to in your `.env` file within the server folder
   - Now naviagte to `(Your Root Folder)/Prospectus/prospectus/` again and run `npm start`
   - Navigate to the link in the terminal and you should be good to go!
