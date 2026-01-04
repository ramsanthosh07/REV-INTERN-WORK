type StatsCardProps = {
  title: string;
  value: string | number;
  percentage?: number;
  color: 'blue' | 'green' | 'indigo' | 'purple' | 'pink';
};

export default function StatsCard({ title, value, percentage, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center text-white`}>
              {percentage !== undefined ? `${percentage}%` : value}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {percentage !== undefined ? value : ''}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {percentage !== undefined && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
