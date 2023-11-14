import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './temp/ListTemplate';

const initApp = (): void => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
    itemEntryForm.addEventListener("submit", (event: Event): void => {
        event.preventDefault();

        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) return;

        const itemid: number = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
            : 1;

        const newItem = new ListItem(itemid.toString(), newEntryText, false); 
        fullList.addItem(newItem);
        template.render(fullList);
    });

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
    clearItems.addEventListener("click", (): void => {
        fullList.clearList();
        template.clear();
    });

    fullList.load();
    template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
