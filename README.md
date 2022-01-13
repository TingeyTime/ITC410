# Semester Project Proposal

I am going to create a weekly/daily planning application that can aid in connecting a simple task to a blocked out event in a schedule. While using a digital calendar, I find it difficult to plan out repeated habitual tasks. Due to the repetition adding of small tasks like homework, journal writing, reading, or other habits, creating these events can be tedious and the time planned can change day to day. Adding these tasks to a calendar does have value though, as it can increase a personal commitment to the task and one gets to see their day planned out completely.

Essentially, I wanted this to be a block-time planner that will aid with the smaller task's of repetitive planning.

To do this my application will have 3 different sections: A week long calendar, task lists, and notes section.

## Calendar

This will show the user their currently planned week. I would like to add the ability for a user to focus on a single day as well as the week as a whole, but I don't know if that would add too much complexity.

## Task lists

I would like a user to have 3 separate task lists: inbox, upcoming, daily. The tasks on these lists will have 4 different attributes: Title, description, duration, and completion. These tasks will be able to be changed into an event and positioned in the week's calendar at a time that can fit with the task's duration.

## Notes

This will be used for general notes about the week. It would be cool to use a Markdown WYSIWYG editor for this, but if that becomes to difficult a simple text editor will suffice.

# DDD

## Events

- user account created
- user account deleted
- user logged in
- user logged out
- task list created
- task list modified
- task list deleted
- task added
- task completed
- task moved
- task loaded
- task modified
- task deleted
- event created
- event moved
- event deleted
- notes modified

## Commands

- createUserAccount
- deletedUserAccount
- logInUser
- logOutUser
- createTaskList
- moveTaskList
- deleteTaskList
- addTask
- completeTask
- moveTask
- loadTask
- modifyTask
- deleteTask
- createEvent
- moveEvent
- deleteEvent
- modifyNotes

## Entities

### Account

- user id (unique)
- name
- password
- sessionInfo

### Event

- event id (unique)
- title
- description
- start
- end

### Task List

- list id (unique)
- name
- tasks
- completed

### Task

- task id (unique)
- title
- description
- duration
- complete

## Value Objects

### Notes

- data (the file's raw data)
- user id

# REST Design

## Endpoints

| Description | URL Fragment | HTTP Method | Path Parameters | Representations |
| ----------- | ------------ | ----------- | --------------- | --------------- |
| create account | `/accounts` | POST | | Create Account |
| delete account | `/accounts/{accountId}` | DELETE | `accountId` | |
| log in | `/accounts/{accountId}/login` | PUT | `accountId` | Account Log In |
| log out | `/accounts/{accountId}/logout` | PUT | `accountId` | |
| get task lists | `/taskLists` | GET | | Get Task Lists |
| add task list | `/taskLists` | POST | `taskListId` | Set Task List |
| edit task list | `/taskLists/{taskListId}` | PUT | `taskListId` | Set Task List |
| delete task lists | `/taskLists/{taskListId}` | DELETE | `taskListId` | |
| get tasks | `/tasks` | GET | | Get Tasks |
| add task | `/tasks` | POST | | Set Task |
| edit task | `/tasks/{taskId}` | PUT | `taskId` | Set Task |
| delete task | `/tasks/{taskId}` | DELETE | `taskId` | |
| get events | `/events` | GET | | Get Events |
| add event | `/events` | POST | | Set Event |
| edit event | `/events/{eventId}` | EDIT | `eventId` | Set Event |
| delete event | `/events/{eventId}` | DELETE | `eventId` | |
| upload notes | `/notes` | POST | | Note |
| download notes | `/notes` | GET | | Note |
| delete notes | `/notes` | DELETE | | |

## Representations

### Create Account

```json
{
    "username": "username",
    "name": "First Name",
    "password": "a-password"
}
```

### Account Log In

```json
{
    "username": "username",
    "password": "a-password"
}
```

### Get Task Lists

```json
{
    "listId": "001",
    "name": "Weekly Todo",
    "tasks": [
        "001",
        "002",
        "003"
    ],
    "completed": null
},
{
    "listId": "002",
    "name": "Daily Todo",
    "tasks": [
        "004",
        "005",
        "006"
    ],
    "completed": null
},
{
    "listId": "003",
    "name": "Goals",
    "tasks": [
        "007",
        "008",
        "009"
    ],
    "completed": null
}
```

### Set Task List

```json
{
    "listId": "001",
    "name": "Weekly Todo",
    "tasks": [
        "001",
        "002",
        "003"
    ],
    "completed": null
}
```

### Get Tasks

```json
[
    {
        "taskId": "001",
        "title": "Write in Journal",
        "description": "Daily Notes",
        "duration": "T00:20:00",
        "complete": null
    },
    {
        "taskId": "002",
        "title": "Clean desk",
        "description": "Find a place for everything",
        "duration": "T00:15:00",
        "complete": null
    }
    {
        "taskId": "003",
        "title": "Finish Homework",
        "description": "Chemistry",
        "duration": "T02:00:00",
        "complete": null
    }
]
```

### Set Task

```json
{
    "title": "Write in Journal",
    "description": "Daily Notes",
    "duration": "T00:20:00",
    "complete": null
}
```

### Note

```txt
This is my note
```

### Get Events

```json
[
    {
        "taskId": "001",
        "title": "Write in Journal",
        "description": "Daily Notes",
        "start": "2022-01-10T22:00:00",
        "end": "2022-01-10T22:20:00",
    },
    {
        "taskId": "002",
        "title": "Clean desk",
        "description": "Find a place for everything",
        "start": "2022-01-10T17:30:00",
        "end": "2022-01-10T17:45:00",
    }
    {
        "taskId": "003",
        "title": "Finish Homework",
        "description": "Chemistry",
        "start": "2022-01-10T18:00:00",
        "end": "2022-01-10T20:00:00",
    }
]
```

### Set Event

```json
[
    {
        "title": "Write in Journal",
        "description": "Daily Notes",
        "start": "2022-01-10T22:00:00",
        "end": "2022-01-10T22:20:00",
    }
]
```