export function getInitials({name}: {name: string}) {
  if (!name) return "";
  
  const nameParts = name.trim().split(/\s+/);
  
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }
  
  const firstInitial = nameParts[0].charAt(0);
  const lastInitial = nameParts[nameParts.length - 1].charAt(0);
  
  return (firstInitial + lastInitial).toUpperCase();
}
