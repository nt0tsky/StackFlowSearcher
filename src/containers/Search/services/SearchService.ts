import { HeaderItem } from '../../../models/HeaderItem';

/**
 * Search service
 */
export class SearchService {
    /**
     * Gets header items
     * @returns header items
     */
    public static GetHeaderItems(): Array<HeaderItem> {
        let items: Array<HeaderItem> = [];
        items.push({ name: 'Автор', align: 'left' });
        items.push({ name: 'Тема', align: 'right' });
        items.push({ name: 'Количество ответов', align: 'right' });
        items.push({ name: 'Теги', align: 'right' });

        return items;
    }
}
