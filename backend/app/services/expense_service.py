from sqlalchemy.orm import Session
from app.db.models.expense import Expense
from app.schemas.expense import ExpenseCreate

class ExpenseService:
    @staticmethod
    def add_expense(db: Session, data: ExpenseCreate, user_id: int):
        new_expense = Expense(**data.dict(), user_id=user_id)
        db.add(new_expense)
        db.commit()
        db.refresh(new_expense)
        return new_expense

    @staticmethod
    def get_user_expenses(db: Session, user_id: int):
        return db.query(Expense).filter(Expense.user_id == user_id).all()

    @staticmethod
    def get_by_id(db: Session, expense_id: int, user_id: int):
        return db.query(Expense).filter(
            Expense.id == expense_id,
            Expense.user_id == user_id
        ).first()

    @staticmethod
    def update(db: Session, expense_id: int, updates: ExpenseCreate, user_id: int):
        db_expense = db.query(Expense).filter(
            Expense.id == expense_id,
            Expense.user_id == user_id
        ).first()
        
        if not db_expense:
            return None
            
        for key, value in updates.dict().items():
            setattr(db_expense, key, value)
        
        db.commit()
        db.refresh(db_expense)
        return db_expense

    @staticmethod
    def delete(db: Session, expense_id: int, user_id: int):
        db_expense = db.query(Expense).filter(
            Expense.id == expense_id,
            Expense.user_id == user_id
        ).first()
        
        if not db_expense:
            return False
            
        db.delete(db_expense)
        db.commit()
        return True