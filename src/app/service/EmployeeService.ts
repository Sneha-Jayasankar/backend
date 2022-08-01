export class EmployeeService{
    getAllEmployees(){
        const employeeResp = [
            {
                "id": "af168383-b350-4894-8ca3-34811ffa34ac",
                "name": "Rahul",
                "joiningDate": "2021-07-15T14:48:00.000Z",
                "role": "dev",
                "experience": 1,
                "status": "Active",
                "designation": 'Associate',
                "employeeProofUrl": "erer",
                "email": "test@test.com",
                "password": "123456",
                "departments": []
            },
            {
                "id": "763a5477-c283-4724-94ce-6dc7a5688685",
                "name": "hawari",
                "joiningDate": "2020-01-08T10:53:09.506Z",
                "role": "dev",
                "experience": 5,
                "status": "Active",
                "designation": "Senior",
                "employeeProofUrl": "http://",
                "email": "test@gmail.com",
                "password": "teereddf",
                "departments": [
                    {
                        "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
                        "name": "developers"
                    }
                ]
            }
        ]
        return employeeResp;
    }
    }