import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees:[]
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    onOffboardInitiated: (state, action) => {
        const {employeeName} = action.payload

        state.employees = state.employees.map(employee => employee.name === employeeName ? { ...employee, status: 'Inactive' } : employee);
    },
    addEmployees: (state, action) => {
        state.employees = action.payload
    },
    editEmployee:(state, action) => {
      const {
        id,
        newEmployeeData
      } = action.payload

      state.employees = state.employees.map((employee) => {
          if(employee._id === Number(id)) {
            return {...employee, ...newEmployeeData}
          }
          return employee
      })
    }
  }
})

export const {
    onOffboardInitiated,
    editEmployee,
    addEmployees
} = employeeSlice.actions

export const selectEmployee = (state) => state.employee.employees

export default employeeSlice.reducer