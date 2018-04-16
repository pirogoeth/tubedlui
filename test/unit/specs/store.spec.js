import { store } from '@/store';

describe('store.js', () => {
  it('exports `store`', () => {
    expect(store).not.toBeNull();
  });

  it('initializes from initialState', () => {
    expect(store.state.debug).toBe(true);
    expect(store.state.endpointClient).toBeNull();
  });
});

describe('store action endpointHistory', () => {
  beforeEach(() => {
    localStorage.removeItem('endpoints');
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
  });

  it('returns empty list when no value is set', () => {
    expect(store.getEndpointHistory()).toEqual([]);
  });

  it('updates localStorage', () => {
    let historyEntry = {
      endpointUrl: 'http://localhost:5000',
      starred: false,
    };

    store.updateEndpointHistory(historyEntry);
    expect(store.getEndpointHistory()).toContain(historyEntry);
  });

  it('does not duplicate entries', () => {
    let historyEntry = {
      endpointUrl: 'http://localhost:5000',
      starred: false,
    };

    expect(store.getEndpointHistory().length).toBe(0);

    store.updateEndpointHistory(historyEntry);
    store.updateEndpointHistory(historyEntry);

    expect(store.getEndpointHistory().length).toBe(1);
  })
});