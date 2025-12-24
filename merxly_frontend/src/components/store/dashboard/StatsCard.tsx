interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: React.ReactNode;
  subtitle?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  subtitle,
}: StatsCardProps) => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='p-3 bg-primary-50 rounded-lg'>{icon}</div>
        {change && (
          <div
            className={`flex items-center text-sm font-medium ${
              change.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span>
              {change.trend === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%
            </span>
          </div>
        )}
      </div>
      <div>
        <p className='text-sm text-neutral-600 mb-1'>{title}</p>
        <p className='text-2xl font-bold text-neutral-900'>{value}</p>
        {subtitle && (
          <p className='text-xs text-neutral-500 mt-1'>{subtitle}</p>
        )}
      </div>
    </div>
  );
};
