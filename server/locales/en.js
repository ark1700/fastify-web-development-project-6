// @ts-check

export default {
  translation: {
    appName: 'Task manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Failed to update user',
          success: 'User updated',
          notFound: 'User not found',
        },
        delete: {
          error: 'Failed to delete user',
          success: 'User deleted',
          notFound: 'User not found',
          hasTasks: 'User has tasks',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status created successfully',
        },
        update: {
          error: 'Failed to update status',
          success: 'Status updated',
          notFound: 'Status not found',
        },
        delete: {
          error: 'Failed to delete status',
          success: 'Status deleted',
          notFound: 'Status not found',
          hasTasks: 'Status has tasks',
        },
      },
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        update: {
          error: 'Failed to update label',
          success: 'Label updated',
          notFound: 'Label not found',
        },
        delete: {
          error: 'Failed to delete label',
          success: 'Label deleted',
          notFound: 'Label not found',
          hasTasks: 'Label has tasks',
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        update: {
          error: 'Failed to update task',
          success: 'Task updated',
          notFound: 'Task not found',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'Task deleted',
          notFound: 'Task not found',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        statuses: 'Statuses',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        edit: 'Edit',
        delete: 'Delete',
        tasks: 'Tasks',
        labels: 'Labels',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        fullName: 'Full name',
        createdAt: 'Created at',
        actions: 'Actions',
        users: 'Users',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        edit: {
          edit: 'Edit',
          submit: 'Save',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        statuses: 'Statuses',
        actions: 'Actions',
        new: {
          createStatus: 'Create status',
          submit: 'Create',
        },
        edit: {
          editStatus: 'Edit status',
          submit: 'Save',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        labels: 'Labels',
        creator: 'Creator',
        executor: 'Executor',
        createdAt: 'Created at',
        tasks: 'Tasks',
        noExecutor: 'No executor',
        selectExecutor: 'Select executor',
        selectStatus: 'Select status',
        selectLabel: 'Select label',
        actions: 'Actions',
        onlyMyTasks: 'Only my tasks',
        show: 'Show',
        new: {
          createTask: 'Create task',
          submit: 'Create',
        },
        edit: {
          editTask: 'Edit task',
          submit: 'Save',
        },
      },
      labels: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        labels: 'Labels',
        actions: 'Actions',
        new: {
          createLabel: 'Create label',
          submit: 'Create',
        },
        edit: {
          editLabel: 'Edit label',
          submit: 'Save',
        },
      },
      welcome: {
        index: {
          hello: 'Welcome to the Task Manager',
          description: 'Manage your tasks efficiently and effectively',
        },
      },
    },
  },
};
