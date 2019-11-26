employees ={"item": "test"}

def get_employee():
    return employees["item"], 200

def remove_employee():
    employees.clear()
    return 200
