/**
 * Ligne de tableau avec nom catégorie
 * 
 * @param {string} name
 */
export function ProductCategory({ name }) {
    return <tr>
        <td colSpan={2}><strong>{name}</strong></td>
    </tr>
}