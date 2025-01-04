// @ts-check

export default {
  translation: {
    appName: 'Fastify Boilerplate',
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
        firstName: 'First name',
        lastName: 'Last name',
        createdAt: 'Created at',
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
        creator: 'Creator',
        executor: 'Executor',
        createdAt: 'Created at',
        tasks: 'Tasks',
        noExecutor: 'No executor',
        selectExecutor: 'Select executor',
        selectStatus: 'Select status',
        new: {
          createTask: 'Create task',
          submit: 'Create',
        },
        edit: {
          editTask: 'Edit task',
          submit: 'Save',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
