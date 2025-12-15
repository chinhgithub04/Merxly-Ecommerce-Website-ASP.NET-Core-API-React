import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import type {
  ProductAttribute,
  ProductVariant,
} from '../../hooks/useCreateProduct';

interface ProductVariantsSectionProps {
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  groupBy: string | null;
  groupedVariants: Record<string, ProductVariant[]> | null;
  onAddAttribute: () => void;
  onUpdateAttributeName: (id: string, name: string) => void;
  onDeleteAttribute: (id: string) => void;
  onAddAttributeValue: (attributeId: string) => void;
  onUpdateAttributeValue: (
    attributeId: string,
    valueId: string,
    value: string
  ) => void;
  onDeleteAttributeValue: (attributeId: string, valueId: string) => void;
  onRegenerateVariants: () => void;
  onUpdateVariant: (
    id: string,
    field: 'sku' | 'price' | 'stockQuantity',
    value: string | number
  ) => void;
  onSetGroupBy: (attributeName: string | null) => void;
}

export const ProductVariantsSection = ({
  attributes,
  variants,
  groupBy,
  groupedVariants,
  onAddAttribute,
  onUpdateAttributeName,
  onDeleteAttribute,
  onAddAttributeValue,
  onUpdateAttributeValue,
  onDeleteAttributeValue,
  onRegenerateVariants,
  onUpdateVariant,
  onSetGroupBy,
}: ProductVariantsSectionProps) => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <h2 className='text-base font-semibold text-neutral-900 mb-4'>
        Variants
      </h2>

      {/* Attributes Panel */}
      <div className='space-y-4 mb-6'>
        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            className='border border-neutral-200 rounded-lg p-4'
          >
            <div className='flex items-start justify-between mb-3'>
              <input
                type='text'
                value={attribute.name}
                onChange={(e) =>
                  onUpdateAttributeName(attribute.id, e.target.value)
                }
                placeholder='Attribute name (e.g. Size, Color)'
                className='flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              />
              <button
                onClick={() => onDeleteAttribute(attribute.id)}
                className='ml-2 p-2 text-error-600 hover:bg-error-50 rounded'
              >
                <TrashIcon className='w-5 h-5' />
              </button>
            </div>

            <div className='space-y-2'>
              {attribute.values.map((value) => (
                <div key={value.id} className='flex items-center gap-2'>
                  <input
                    type='text'
                    value={value.value}
                    onChange={(e) =>
                      onUpdateAttributeValue(
                        attribute.id,
                        value.id,
                        e.target.value
                      )
                    }
                    placeholder='Value (e.g. Small, Red)'
                    className='flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                  />
                  <button
                    onClick={() =>
                      onDeleteAttributeValue(attribute.id, value.id)
                    }
                    className='p-2 text-neutral-500 hover:text-error-600 hover:bg-error-50 rounded'
                  >
                    <TrashIcon className='w-4 h-4' />
                  </button>
                </div>
              ))}

              <button
                onClick={() => onAddAttributeValue(attribute.id)}
                className='flex items-center gap-1 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded'
              >
                <PlusIcon className='w-4 h-4' />
                Add value
              </button>
            </div>
          </div>
        ))}

        {attributes.length < 3 && (
          <Button variant='outline' onClick={onAddAttribute} className='w-full'>
            <PlusIcon className='w-5 h-5 mr-2' />
            Add Attribute
          </Button>
        )}

        {attributes.length > 0 && (
          <Button onClick={onRegenerateVariants} className='w-full'>
            Generate Variants
          </Button>
        )}
      </div>

      {/* Variants Table */}
      {variants.length > 0 && (
        <>
          {/* Group By Control */}
          {attributes.length >= 2 && (
            <div className='mb-4'>
              <label className='block text-sm font-medium text-neutral-700 mb-2'>
                Group variants by
              </label>
              <div className='flex gap-2'>
                <button
                  onClick={() => onSetGroupBy(null)}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    !groupBy
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'bg-white border-neutral-300 text-neutral-700'
                  }`}
                >
                  None
                </button>
                {attributes.map((attr) => (
                  <button
                    key={attr.id}
                    onClick={() => onSetGroupBy(attr.name)}
                    className={`px-3 py-2 text-sm rounded-md border ${
                      groupBy === attr.name
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'bg-white border-neutral-300 text-neutral-700'
                    }`}
                  >
                    {attr.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variants Table */}
          <div className='border border-neutral-200 rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-neutral-200'>
              <thead className='bg-neutral-50'>
                <tr>
                  {attributes.map((attr) => (
                    <th
                      key={attr.id}
                      className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'
                    >
                      {attr.name}
                    </th>
                  ))}
                  <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                    Price
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                    Stock
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                    SKU
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-neutral-200'>
                {!groupedVariants
                  ? // No grouping - flat list
                    variants.map((variant) => (
                      <tr key={variant.id}>
                        {attributes.map((attr) => {
                          const selection = variant.attributeSelections.find(
                            (s) => s.attributeName === attr.name
                          );
                          return (
                            <td
                              key={attr.id}
                              className='px-4 py-3 text-sm text-neutral-900'
                            >
                              {selection?.value || '-'}
                            </td>
                          );
                        })}
                        <td className='px-4 py-3'>
                          <input
                            type='number'
                            step='0.01'
                            value={variant.price}
                            onChange={(e) =>
                              onUpdateVariant(
                                variant.id,
                                'price',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className='w-24 px-2 py-1 border border-neutral-300 rounded text-sm'
                          />
                        </td>
                        <td className='px-4 py-3'>
                          <input
                            type='number'
                            value={variant.stockQuantity}
                            onChange={(e) =>
                              onUpdateVariant(
                                variant.id,
                                'stockQuantity',
                                parseInt(e.target.value) || 0
                              )
                            }
                            className='w-20 px-2 py-1 border border-neutral-300 rounded text-sm'
                          />
                        </td>
                        <td className='px-4 py-3'>
                          <input
                            type='text'
                            value={variant.sku}
                            onChange={(e) =>
                              onUpdateVariant(variant.id, 'sku', e.target.value)
                            }
                            placeholder='SKU'
                            className='w-32 px-2 py-1 border border-neutral-300 rounded text-sm'
                          />
                        </td>
                      </tr>
                    ))
                  : // Grouped display
                    Object.entries(groupedVariants).map(
                      ([groupValue, groupVariants]) => (
                        <>
                          <tr
                            key={`group-${groupValue}`}
                            className='bg-neutral-50'
                          >
                            <td
                              colSpan={attributes.length + 3}
                              className='px-4 py-2 text-sm font-semibold text-neutral-900'
                            >
                              {groupBy}: {groupValue}
                            </td>
                          </tr>
                          {groupVariants.map((variant) => (
                            <tr key={variant.id}>
                              {attributes.map((attr) => {
                                const selection =
                                  variant.attributeSelections.find(
                                    (s) => s.attributeName === attr.name
                                  );
                                return (
                                  <td
                                    key={attr.id}
                                    className='px-4 py-3 text-sm text-neutral-900'
                                  >
                                    {selection?.value || '-'}
                                  </td>
                                );
                              })}
                              <td className='px-4 py-3'>
                                <input
                                  type='number'
                                  step='0.01'
                                  value={variant.price}
                                  onChange={(e) =>
                                    onUpdateVariant(
                                      variant.id,
                                      'price',
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className='w-24 px-2 py-1 border border-neutral-300 rounded text-sm'
                                />
                              </td>
                              <td className='px-4 py-3'>
                                <input
                                  type='number'
                                  value={variant.stockQuantity}
                                  onChange={(e) =>
                                    onUpdateVariant(
                                      variant.id,
                                      'stockQuantity',
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className='w-20 px-2 py-1 border border-neutral-300 rounded text-sm'
                                />
                              </td>
                              <td className='px-4 py-3'>
                                <input
                                  type='text'
                                  value={variant.sku}
                                  onChange={(e) =>
                                    onUpdateVariant(
                                      variant.id,
                                      'sku',
                                      e.target.value
                                    )
                                  }
                                  placeholder='SKU'
                                  className='w-32 px-2 py-1 border border-neutral-300 rounded text-sm'
                                />
                              </td>
                            </tr>
                          ))}
                        </>
                      )
                    )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
