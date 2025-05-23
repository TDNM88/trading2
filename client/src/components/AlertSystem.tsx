import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Wifi, AlertTriangle, TrendingUp, Volume2, Activity } from 'lucide-react';

interface Alert {
  id: string;
  type: 'technical' | 'market' | 'risk';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'technical',
      title: 'Connection Status',
      message: 'Data feed connection stable',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'market',
      title: 'Volume Alert',
      message: 'Unusual volume detected in NIFTY',
      timestamp: new Date(),
      read: false
    },
    {
      id: '3',
      type: 'risk',
      title: 'Risk Threshold',
      message: 'Portfolio drawdown approaching limit',
      timestamp: new Date(),
      read: false
    }
  ]);

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <Wifi className="h-5 w-5 text-blue-500" />;
      case 'market':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Bell className="h-5 w-5 text-blue-500 mr-2" />
          Alert System
        </h2>
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-green-500">
            <Activity className="h-4 w-4 mr-1" />
            Active
          </span>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              alert.read
                ? 'bg-gray-800/30 border-gray-700'
                : 'bg-gray-800/50 border-blue-500/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                {getAlertIcon(alert.type)}
                <div className="ml-3">
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              {!alert.read && (
                <button
                  onClick={() => markAsRead(alert.id)}
                  className="text-xs text-blue-500 hover:text-blue-400"
                >
                  Mark as read
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertSystem;