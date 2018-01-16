import resetPageCount from '../../actions/resetPageCount';

describe('Ajax request action creators', () => {
  it('should return RESET_PAGE_COUNT when resetPageCount is called ', () => {
    const action = {
      type: 'RESET_PAGE_COUNT',
    };
    expect(resetPageCount()).toMatchObject(action);
  });
});
