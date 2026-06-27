export const strengths = [
  { id: 's1', title: '기관 맞춤 커리큘럼', desc: '대상·회차에 맞춘 수업안을 설계합니다.', icon: 'ClipboardList' },
  { id: 's2', title: '검증된 강사 양성', desc: '실기와 교수법을 겸비한 강사를 배출합니다.', icon: 'BadgeCheck' },
  { id: 's3', title: '교재·교구 일괄 지원', desc: '교재·교구·PPT를 함께 제공합니다.', icon: 'Package' },
  { id: 's4', title: '온·오프 병행', desc: '줌 수업과 대면 수업을 함께 운영합니다.', icon: 'Video' },
  { id: 's5', title: '연계 자격증', desc: '수업과 자격취득을 연결합니다.', icon: 'GraduationCap' },
] as const;

export const teachingSupports = [
  { id: 'book', label: '교재', icon: 'BookOpen' },
  { id: 'tool', label: '교구', icon: 'Wrench' },
  { id: 'songbook', label: '연습곡집', icon: 'Music2' },
  { id: 'pptOn', label: '온라인 PPT', icon: 'MonitorPlay' },
  { id: 'pptOff', label: '오프라인 PPT', icon: 'Presentation' },
] as const;

export const institutionBenefits = [
  { id: 'cert', title: '자격증 연계', desc: '수업 이수와 자격취득을 연결합니다.', accent: '#1B9E8F' },
  { id: 'zoom', title: '온라인 줌 수업', desc: '원거리 기관도 비대면으로 운영합니다.', accent: '#F2B441' },
  { id: 'rent', title: '악기 대여', desc: '수업에 필요한 악기를 대여 지원합니다.', accent: '#B59AD1' },
] as const;

export const relatedDiscountGroups = [
  { id: 'd1', label: '복지관' },
  { id: 'd2', label: '주간보호센터' },
  { id: 'd3', label: '방과후 교실' },
  { id: 'd4', label: '평생교육원' },
  { id: 'd5', label: '문화센터' },
  { id: 'd6', label: '요양시설' },
  { id: 'd7', label: '지역아동센터' },
] as const;
