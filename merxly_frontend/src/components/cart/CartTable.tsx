import type { CartItemDto } from '../../types/models/cart';
import { CartItemRow } from './CartItemRow';

interface CartTableProps {
  items: CartItemDto[];
  selectedItems: Set<string>;
  onSelectItem: (itemId: string) => void;
  onSelectAll: (checked: boolean) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const CartTable = ({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onUpdateQuantity,
  onRemoveItem,
}: CartTableProps) => {
  const allSelected =
    items.length > 0 && items.every((item) => selectedItems.has(item.id));

  return (
    <div className='bg-white border-x border-b border-neutral-200 rounded-b-lg overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-neutral-50 border-b border-neutral-200'>
            <tr>
              <th className='w-12 px-4 py-3 text-left'>
                <input
                  type='checkbox'
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className='w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-600 cursor-pointer'
                />
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Products
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Price
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Quantity
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Subtotal
              </th>
              <th className='w-16 px-4 py-3'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-neutral-200'>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='px-4 py-12 text-center text-neutral-500'
                >
                  Your cart is empty
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onSelect={onSelectItem}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
