from app.tasks.email_sender import send_email

def send_subscription_reminder(email: str, subscription_name: str):
    subject = f"Reminder: {subscription_name} due soon"
    body = f"Your subscription for {subscription_name} is due. Please take necessary action."
    send_email(email, subject, body)