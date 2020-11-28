import { Domains, Labels, RowData, Domain, Label } from "../types/Types";
let mockId = 0;
const MockNames = [
    "George Washington",
    "John Adams",
    "Thomas Jefferson",
    "James Madison",
    "James Monroe",
    "John Quincy Adams",
    "Andrew Jackson",
    "Martin Van Buren",
    "William Henry Harrison",
    "John Tyler",
    "James K. Polk",
    "Zachary Taylor",
    "Millard Fillmore",
    "Franklin Pierce",
    "James Buchanan",
    "Abraham Lincoln",
    "Andrew Johnson",
    "Ulysses S. Grant",
    "Rutherford B. Hayes",
    "James A. Garfield",
    "Chester A. Arthur",
    "Grover Cleveland",
    "Benjamin Harrison",
    "Grover Cleveland",
    "William McKinley",
    "Theodore Roosevelt",
    "William Howard Taft",
    "Woodrow Wilson",
    "Warren G. Harding",
    "Calvin Coolidge",
    "Herbert Hoover",
    "Franklin D. Roosevelt",
    "Harry S. Truman",
    "Dwight D. Eisenhower",
    "John F. Kennedy",
    "Lyndon B. Johnson",
    "Richard Nixon",
    "Gerald Ford",
    "Jimmy Carter",
    "Ronald Reagan",
    "George H. W. Bush",
    "Bill Clinton",
    "George W. Bush",
    "Barack Obama",
    "Donald Trump"
];

const MockDescriptions = ['The president of the United States is the head of state and head of government of the United States',
    'Since the office was established in 1789, there have been 45 presidencies, while 44 men have served as president. The first, George Washington, won a unanimous vote of the Electoral College. Grover Cleveland served two non-consecutive terms in office (the only president to have done so) and is therefore counted as the 22nd and 24th president of the United States',
    'Quick description'];

export function createMockRows(count: number = 100): RowData[] {
    const arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(createMockRow());
    }
    return arr;
}

function createMockRow(): RowData {
    const name = getRandomItem(MockNames);
    const description = getRandomItem(MockDescriptions);
    const value = Math.floor(Math.random() * 10) - 1;
    const domains = getItemsFromArr(Domains);
    const labels = getItemsFromArr(Labels);
    const id = (Math.random() * 99999).toFixed(0) + '_' + (mockId++);
    return { id, name, description, domains, labels, value };
}

function getItemsFromArr<T>(arr: T[]): T[] {
    const count = Math.ceil(Math.random() * 3);
    const items: Set<T> = new Set();
    while (items.size < count) {
        const item = getRandomItem<T>(arr);
        items.add(item);
    }
    return Array.from(items);
}

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}