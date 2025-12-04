export const users = {
    standard: {
        user: 'standard_user',
        pass: 'secret_sauce',
        shouldSucceed: true,
        scenario: 'Standard User',
    },

    incorrect_credentials:  {
        user: 'incorrect_credentials',
        pass: 'incorrect_credentials',
        shouldSucceed: false,
        scenario: 'Incorrect Credentials User',
    },

    locked_user:  {
        user: 'locked_out_user',
        pass: 'secret_sauce',
        shouldSucceed: false,
        scenario: 'Locked Out User',
    },

    problem_user:{
        user: 'problem_user',
        pass: 'secret_sauce',
        shouldSucceed: true,
        scenario: 'Problem User',
    },

    performance_glitch_user: {
        user: 'performance_glitch_user',
        pass: 'secret_sauce',
        shouldSucceed: true,
        scenario: 'Performande Glick User', 
    },

    error_user: {
        user: 'error_user',
        pass: 'secret_sauce',
        shouldSucceed: true,
        scenario: 'Error User',
    },

    visual_user: {
        user: 'visual_user',
        pass: 'secret_sauce',
        shouldSucceed: true,
        scenario: 'Visual User',
    }
}

