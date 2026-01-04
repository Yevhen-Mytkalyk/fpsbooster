from tkinter import *
from tkinter import messagebox

root = Tk()
root.geometry('600x600')
root.title('fps booster 3000')
root['bg'] = 'red'

def click(event):
    for _ in range(1000):
        messagebox.showerror(
            'System 32 error',
            'Помилка system 32. Перезавантажте ваш ПК'
        )

root.bind('<1>', click)

button = Button(
    root,
    text='Натисни і твій ПК прискориться',
    command=lambda e=None: click(e),
    font=('Arial', 14, 'bold'),
    bg='#FF6600',
    fg='white',
    padx=20,
    pady=10,
    relief='raised',
    cursor='hand2',
    activebackground='#FF8C00',
    activeforeground='white'
)
button.pack(pady=20)

c = Canvas(root, width=500, height=200, bg='white')
c.create_rectangle(10, 10, 490, 190, fill='yellow', outline='black', width=2)
c.create_text(250, 100, text='FPS Booster 3000\nПрограма для прискорення ПК і\nпідвищення FPS у іграх на 300%\n By Євген',
              font=('Arial', 16, 'bold'), fill='black', justify='center')
c.pack(pady=20)
root.mainloop()
