#include <stdio.h>
#include <string.h>

struct Medicine
{
    char ID[10];
    char name[100];
    char mDate[40];
    int quantity;
    float price;
};
int tracker = 0;

struct Medicine medicine_record[100];

void addMedicine()
{
    struct Medicine med;
    printf("Enter medicine ID: ");
    scanf("%s", med.ID);
    printf("Enter medicine name: ");
    scanf("%s", med.name);
    printf("Enter medicine manufacuring date: ");
    scanf("%s", med.mDate);
    printf("Enter medicine quantity: ");
    scanf("%d", &med.quantity);
    printf("Enter medicine Price: ");
    scanf("%f", &med.price);
    medicine_record[tracker] = med;
    printf("Added\n");
    tracker++;
    menu();
}
void purchaseMedicine()
{
    struct Medicine med;
    printf("Enter medicine ID: ");
    scanf("%s", med.ID);
    printf("Enter medicine name: ");
    scanf("%s", med.name);
    printf("Enter medicine quantity: ");
    scanf("%d", &med.quantity);
    int confirm;
    for (int i = 0; i < tracker; i++)
    {
        if (strcmp(med.name, medicine_record[i].name) == 0)
        {
            if (medicine_record[i].quantity == 0)
            {
                printf("Stock-Out\n");
                menu();
            }
            printf("Are you sure, you want to buy? 1 - YES, 2 - NO : ");
            scanf("%d", &confirm);
            if (confirm == 1)
            {
                printf("Medicine ID: %s\n", med.ID);
                printf("Medicine Name: %s\n", med.name);
                printf("Medicine Manufacturing Date: %s\n", medicine_record[i].mDate);
                printf("Medicine quantity: %d\n", med.quantity);
                printf("Medicine total price: %f\n", medicine_record[i].price * med.quantity);
                medicine_record[i].quantity -= med.quantity;
                menu();
            }
            else if (confirm == 2)
            {
                menu();
            }
        }
    }
    printf("Not-Found\n");
    menu();
}
void desplayMedicine()
{
    printf("--------------------------------------------------------------\n");
    printf("|   ID   |   name    |   M_Date   |   quantity  |   price    |\n");
    for (int i = 0; i < tracker; i++)
    {
        printf("--------------------------------------------------------------\n");
        printf("| %s | %s | %s | %d | %f |\n", medicine_record[i].ID, medicine_record[i].name, medicine_record[i].mDate, medicine_record[i].quantity, medicine_record[i].price);
        printf("--------------------------------------------------------------\n");
    }
    menu();
}

void menu()
{
    int option;
    printf("1). Add Medicine\n");
    printf("2). Purchase Medicine\n");
    printf("3). Display Statics\n");
    printf("4). Exit Menu\n");
    printf("Choose a option: ");
    scanf("%d", &option);
    if (option == 1)
    {
        addMedicine();
    }
    else if (option == 2)
    {
        purchaseMedicine();
    }
    else if (option == 3)
    {
        desplayMedicine();
    }
    else if (option == 4)
    {
        printf("Exited from menu");
    }
    else
    {
        printf("Invalid option\n");
        menu();
    }
}

int main()
{
    menu();
}