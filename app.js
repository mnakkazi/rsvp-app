/* ====================================
 VARIABLES
==================================== */ 
const form = document.getElementById('registrar');
const input = form.querySelector('input');
const mainDiv = document.querySelector('.main');
const invitees = document.getElementById('invited-list');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckbox.type = 'checkbox';

div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, invitees);

/* ====================================
 HIDE UNRESPONDED
==================================== */ 
filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const invited = invitees.children;
    if (isChecked) {
        for (let i = 0; i < invited.length; i++) {
            let li = invited[i];
            if (li.className === 'responded') {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < invited.length; i++) {
            let li = invited[i];
            li.style.display = '';
        }
    }
});

/* ====================================
 ADD GUEST TO LIST
==================================== */ 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invitee = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = input.value;
    input.value = '';
    invitee.appendChild(span);

    const label = document.createElement('label'); // create label
    label.textContent = 'Confirmed ';

    const checkbox = document.createElement('input'); // create checkbox
    checkbox.type = 'checkbox';

    label.appendChild(checkbox); // append checkbox to label and label to list item(invitee)
    invitee.appendChild(label);

    const edit = document.createElement('button'); // add edit button
    edit.textContent = 'edit';
    invitee.appendChild(edit);

    const remove = document.createElement('button'); // add remove button
    remove.textContent = 'remove';
    invitee.appendChild(remove);

    invitees.appendChild(invitee);
});

/* ====================================
 HIGHLIGHT CONFIRMED GUESTS
==================================== */ 
invitees.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked // (checked is a checkbox attribute: true when checked, false otherwise)
    const listItem = checkbox.parentNode.parentNode; // select earlier created 'li' to activate the css 'responded' class on it

    if (checked) {
        listItem.classList.add('responded');
    } else {
        listItem.classList.remove('responded');
    }
});

/* ====================================
 REMOVE GUESTS
==================================== */ 
invitees.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.parentNode;

        if (e.target.textContent === 'remove') {  // remove guest
            invitees.removeChild(li);
        } else if (e.target.textContent === 'edit') {  // edit guest name
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            e.target.textContent = 'save';
        } else if (e.target.textContent === 'save') {  // save changes
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            e.target.textContent = 'edit';
        }
    }
});
