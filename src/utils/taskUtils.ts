import type { Task, Filters } from "../types/index";

function filterTasks(tasks: Task[], filters: Filters): Task[] {
    return tasks.filter((task) => {

        if (filters.status && task.status !== filters.status) {
            return false;
        }

        if (filters.priority && task.priority !== filters.priority) {
            return false;
        }

        if (
            filters.search &&
            !task.title.toLocaleLowerCase().includes(filters.search.toLowerCase())
        ) {
            return false;
        }

        return true;
    })
}

export default filterTasks;
