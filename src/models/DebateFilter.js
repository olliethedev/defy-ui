class DebateFilter {
  constructor(
    active = true,
    sortByStake = true,
    sortByAccount = false,
    searchText = false,
    tag = false
  ) {
    this.active = active;
    this.sortByStake = sortByStake;
    this.sortByAccount = sortByAccount;
    this.searchText = searchText;
    this.tag = tag;
  }
}
export default DebateFilter;
