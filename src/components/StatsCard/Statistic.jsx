import React from 'react';
import StatsCard from './StatsCard';
import { statsCard } from "../../data/dummy"

const Statistic = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {
                    statsCard.map((item, i) => 
                        <StatsCard
                            key={i}
                            icon={item.icon}
                            name={item.name}
                            total={item.total}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Statistic;

