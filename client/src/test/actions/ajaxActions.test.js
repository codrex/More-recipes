import * as actions from '../../actions/ajaxActions';

describe('Ajax request action creators', () => {
  it(`should return BEGIN_AJAX_REQUEST and loading
  true when beginAjaxRequest is called`,
    () => {
      const action = {
        type: 'BEGIN_AJAX_REQUEST',
        loading: true
      };
      expect(actions.beginAjaxRequest(true)).toMatchObject(action);
    });

  it(`should return END_AJAX_REQUEST action type
  when endAjaxRequest is called`, () => {
      const action = {
        type: 'END_AJAX_REQUEST',
        response: {}
      };
      expect(actions.endAjaxRequest({})).toMatchObject(action);
    });

  it(`should return RESET_REQ_COUNT action
  type when resetReqCount is called`, () => {
      const action = {
        type: 'RESET_REQ_COUNT',
      };
      expect(actions.resetReqCount({})).toMatchObject(action);
    });

  it(`should return RESET_SUCCESS action type when
   resetSuccess is called`, () => {
      const action = {
        type: 'RESET_SUCCESS',
      };
      expect(actions.resetSuccess({})).toMatchObject(action);
    });
});
