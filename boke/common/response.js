module.exports = {
	success: (data)=>({
		code: 2,
		msg: 'ok',
		body: data
	}),
	notlogin: (err) => ({
		code: 0,
		msg: err
	}),
	error:(err)=>({
		code:1,
		msg:err
	})
};