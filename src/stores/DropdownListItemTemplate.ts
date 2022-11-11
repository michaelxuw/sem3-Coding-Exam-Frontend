export interface DropdownOptionBasics {
    id: number;
    value: string;
    selected: boolean;
    key: string;
}

export let locationOptions: DropdownOptionBasics[] = [
    { id: 0, value: 'New York', selected: false, key: 'location' },
    { id: 1, value: 'Dublin', selected: false, key: 'location' },
    { id: 2, value: 'California', selected: false, key: 'location' },
    { id: 3, value: 'Istanbul', selected: false, key: 'location' },
    { id: 4, value: 'Oslo', selected: false, key: 'location' },
];


