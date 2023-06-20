# Squash-Booking-App

Github Instructions:

**\*\***\*\***\*\***Read the instructions carefully**\*\***\***\*\***

1. In order to get the dev branch cloned into your local machine. Command: git clone -b dev https://github.com/Zaberahmed/Squash-Booking-App.git

2. In order to see all the available branches type the command. If you have not created any branches then you will see only 'dev'. Command: git branch

3. You can check which branch you are in by typing 'git branch' and the active branch will have a * beside them (example: *dev). Now create your own branch. Command: 'git checkout -b <your_branch>'

4. Now you are inside your branch, start coding...

5. After that type git add . and git commit -m "message" to commit your changes locally to your branch.

6. Now you need to merge the changes to the 'dev' branch. Command: git checkout dev (switch to dev branch)

7. Before pushing your changes, always pull the other's changes into your local repo first by typing 'git pull origin dev'

8. Now merge your branch with dev. Command: git merge <your_branch>

9. Now push your changes by typing 'git push origin dev'. This will also push the changes into remote repo.

10. Now go back to your branch by typing 'git checkout <your_branch>' and start coding.

11. If you see the branch you are working on is not updated then update your branch with the latest updates from the remote repo. Type 'git fetch origin && git merge origin/dev' and your branch will be updated as well.

**\*\***More instructions\***\*\*\*\***

1. Do not push anything to main.
2. Always pull work from remote before starting your work. Command: git checkout dev && git pull origin dev
3. Always pull from the remote repo before pushing your work. Command: git pull origin dev && git push origin dev
4. Do not delete any branch or if you have to, at least consult with someone else.
