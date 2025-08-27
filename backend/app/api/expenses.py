# app/api/expense.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.expense import ExpenseCreate, ExpenseOut
from app.services.expense_service import ExpenseService
from app.services.user_service import UserService
from app.schemas.user import UserResponse

router = APIRouter(
    tags=["Expenses"]
)

@router.get("/", response_model=List[ExpenseOut], summary="Get all expenses")
def get_expenses(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Get all expenses for the current user.
    """
    try:
        return ExpenseService.get_user_expenses(db, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{expense_id}", response_model=ExpenseOut, summary="Get a specific expense")
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Get a specific expense by ID.
    """
    try:
        expense = ExpenseService.get_by_id(db, expense_id, current_user.id)
        if not expense:
            raise HTTPException(status_code=404, detail="Expense not found")
        return expense
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/", response_model=ExpenseOut, summary="Add a new expense")
def add_expense(
    expense: ExpenseCreate, 
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Add a new expense entry to the database.
    """
    try:
        return ExpenseService.add_expense(db, expense, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{expense_id}", response_model=ExpenseOut, summary="Update an expense")
def update_expense(
    expense_id: int,
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Update an expense.
    """
    try:
        updated_expense = ExpenseService.update(db, expense_id, expense, current_user.id)
        if not updated_expense:
            raise HTTPException(status_code=404, detail="Expense not found")
        return updated_expense
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{expense_id}", summary="Delete an expense")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Delete an expense.
    """
    try:
        success = ExpenseService.delete(db, expense_id, current_user.id)
        if not success:
            raise HTTPException(status_code=404, detail="Expense not found")
        return {"message": "Expense deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
