'use client';

import { useState } from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import type { FamilyGroup } from '@/lib/loadFamilyData';
import { useTranslation } from '@/hooks/useTranslation';

export default function FamilyTreeClient({ data }: { data: FamilyGroup[] }) {
  // Initially show first 3 groups, rest collapsed
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(data.slice(0, 3).map(g => g.id))
  );
  // Table view collapsed by default
  const [isTableViewOpen, setIsTableViewOpen] = useState(false);
  const { t } = useTranslation();

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedGroups(new Set(data.map(g => g.id)));
  };

  const collapseAll = () => {
    setExpandedGroups(new Set());
  };

  return (
    <BackgroundWrapper images={['/assets/temple.jpg']}>
      <div className="min-h-screen p-3 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-serif mb-2">
          🌳 {t('familyTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
          {t('familySubtitle')}
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm font-medium"
          >
            {t('expandAll')}
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition text-xs sm:text-sm font-medium"
          >
            {t('collapseAll')}
          </button>
          <div className="text-xs sm:text-sm text-slate-600 flex items-center">
            {t('totalFamilies')}: <strong className="ml-1">{data.length}</strong>
          </div>
        </div>

        {/* Collapsible Table View */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => setIsTableViewOpen(!isTableViewOpen)}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl p-3 sm:p-4 flex items-center justify-between hover:from-indigo-700 hover:to-indigo-800 transition shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div className="text-left">
                <h3 className="font-semibold text-sm sm:text-base">
                  {t('allFamiliesTable')}
                </h3>
                <p className="text-xs text-indigo-100 mt-0.5">
                  {t('allFamiliesTable')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-indigo-100">
                {isTableViewOpen ? t('collapse') : t('expand')}
              </span>
              <span className="text-indigo-100">
                {isTableViewOpen ? '▼' : '▶'}
              </span>
            </div>
          </button>

          {isTableViewOpen && (
            <div className="mt-3 bg-white rounded-xl border-2 border-indigo-200 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full w-full text-xs sm:text-sm">
                  <thead className="bg-indigo-50 text-indigo-900">
                    <tr>
                      <th className="p-2 sm:p-3 text-left font-semibold border-b border-indigo-200">
                        {t('groupName')}
                      </th>
                      <th className="p-2 sm:p-3 text-left font-semibold border-b border-indigo-200">
                        {t('father')}
                      </th>
                      <th className="p-2 sm:p-3 text-left font-semibold border-b border-indigo-200">
                        {t('mother')}
                      </th>
                      <th className="p-2 sm:p-3 text-left font-semibold border-b border-indigo-200">
                        {t('sons')}
                      </th>
                      <th className="p-2 sm:p-3 text-left font-semibold border-b border-indigo-200">
                        {t('daughters')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((group, idx) => {
                      return (
                        <tr
                          key={group.id}
                          className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="p-2 sm:p-3 font-medium text-slate-800">
                            {group.groupName}
                          </td>
                          <td className="p-2 sm:p-3 text-slate-700">
                            {group.father}
                          </td>
                          <td className="p-2 sm:p-3 text-slate-700">
                            {group.mother}
                          </td>
                          <td className="p-2 sm:p-3 text-slate-700">
                            {group.sons.length > 0 ? (
                              <div className="space-y-1">
                                {group.sons.map((son, i) => (
                                  <div key={i} className="text-xs">
                                    {son.name}
                                    {son.spouse && (
                                      <span className="text-slate-500 ml-1">
                                        ({son.spouse})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="p-2 sm:p-3 text-slate-700">
                            {group.daughters.length > 0 ? (
                              <div className="space-y-1">
                                {group.daughters.map((daughter, i) => (
                                  <div key={i} className="text-xs">
                                    {daughter.name}
                                    {daughter.spouse && (
                                      <span className="text-slate-500 ml-1">
                                        ({daughter.spouse})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Family Groups */}
        <div className="space-y-3 sm:space-y-4">
          {data.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const totalMembers = 2 + group.sons.length + group.daughters.length;

            return (
              <div
                key={group.id}
                className="bg-white rounded-xl border-2 border-amber-200 shadow-sm overflow-hidden"
              >
                {/* Group Header - Clickable */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-amber-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <span className="text-lg">📂</span>
                      ) : (
                        <span className="text-lg">📁</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                        {group.groupName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {totalMembers} {t('members')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {isExpanded ? t('collapse') : t('expand')}
                    </span>
                    <span className="text-slate-400">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>
                </button>

                {/* Group Content - Expandable */}
                {isExpanded && (
                  <div className="border-t border-amber-200 p-3 sm:p-4 space-y-3">
                    {/* Parents */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                        <p className="text-xs font-semibold text-amber-700 mb-1">
                          👨 {t('father')}
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {group.father}
                        </p>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
                        <p className="text-xs font-semibold text-pink-700 mb-1">
                          👩 {t('mother')}
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {group.mother}
                        </p>
                      </div>
                    </div>

                    {/* Sons */}
                    {group.sons.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                          👦 {t('sons')} ({group.sons.length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {group.sons.map((son, idx) => (
                            <div
                              key={idx}
                              className="bg-blue-50 rounded-lg p-2.5 border border-blue-200"
                            >
                              <p className="text-sm font-medium text-slate-800">
                                {son.name}
                              </p>
                              {son.spouse && (
                                <p className="text-xs text-slate-600 mt-1">
                                  💑 {son.spouse}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Daughters */}
                    {group.daughters.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                          👧 {t('daughters')} ({group.daughters.length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {group.daughters.map((daughter, idx) => (
                            <div
                              key={idx}
                              className="bg-purple-50 rounded-lg p-2.5 border border-purple-200"
                            >
                              <p className="text-sm font-medium text-slate-800">
                                {daughter.name}
                              </p>
                              {daughter.spouse && (
                                <p className="text-xs text-slate-600 mt-1">
                                  💑 {daughter.spouse}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <p className="mt-10 text-center text-slate-500 text-sm">
            குடும்ப விவரங்கள் இல்லை
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
}

