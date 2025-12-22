import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export interface CheckResult {
  leaked: boolean;
  count: number;
  message: string;
}

interface ResultDisplayProps {
  result: CheckResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const { leaked, count, message } = result;

  const getIcon = () => {
    if (!leaked) {
      return <CheckCircle className="w-12 h-12 text-green-400" />;
    }
    if (count > 10000) {
      return <AlertCircle className="w-12 h-12 text-red-400" />;
    }
    return <AlertTriangle className="w-12 h-12 text-orange-400" />;
  };

  const getBackgroundColor = () => {
    if (!leaked) return 'bg-green-900/20';
    if (count > 10000) return 'bg-red-900/20';
    return 'bg-orange-900/20';
  };

  const getBorderColor = () => {
    if (!leaked) return 'border-green-800/50';
    if (count > 10000) return 'border-red-800/50';
    return 'border-orange-800/50';
  };

  const getTitle = () => {
    if (!leaked) return 'Password is Safe';
    if (count > 10000) return 'Highly Compromised';
    return 'Password Leaked';
  };

  return (
    <div
      className={`glass-panel rounded-tahoe-lg p-6 transition-tahoe ${getBackgroundColor()} border-2 ${getBorderColor()}`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="transition-tahoe transform hover:scale-110">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {getTitle()}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {message}
          </p>
        </div>
        {leaked && count > 0 && (
          <div className="mt-2 px-4 py-2 bg-white/5 rounded-full">
            <p className="text-xs font-medium text-gray-400">
              Found in <span className="font-bold text-white">{count.toLocaleString()}</span> breach
              {count !== 1 ? 'es' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

