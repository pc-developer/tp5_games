<?php
namespace app\gph\controller;

use think\Controller;
use think\Cookie;
use think\Session;
use think\Request;
use think\Db;
use think\Exception;

class Index extends Controller
{
    public function index()
    {
        $sta = 'login';
        $sta = input('sta');
        $this->assign('sta', $sta);
        return $this->fetch();
    }
    public function login(Request $request)
    {
        $username = $request->param('username');
        $passwd = sha1($request->param('passwd'));
        $captcha = $request->param('captcha');

        if(isset($_POST['username']) && isset($_POST['passwd'])){
            try{
                $result = Db::table('player_information')
                          ->where('username', $username)
                          //->where('password', $passwd)
                          ->select();
                          
                if(!captcha_check($captcha)){
                    throw new Exception('验证码错误!');
                }
                if((count($result) > 0) && ($passwd != $result[0]['password'])){
                    throw new Exception('用户名或密码错误!');
                }
                if(count($result) <= 0){
                    throw new Exception('该用户未注册!');
                }else{
                    Session::set('valid_user', $username);
                    Cookie::set('laster', $username);

                    if(($username == 'admin') && ($passwd == $result[0]['password'])){
                        $this->success('登录成功！', 'gpa/index/adminhome');
                    }else if(($username == $result[0]['username']) && ($passwd == $result[0]['password'])){
                        $this->success('登录成功！', 'index/home');
                    }else{
                         $this->error('登录失败!');
                    }
                }
            }catch(Exception $e){
                $this->error($e->getMessage().'登录失败!');
            }
        }
    }
    public function register(Request $request)
    {
        $username = $request->param('username');
        $passwd = $request->param('passwd');
        $passwd2 = $request->param('passwd2');
        $email = $request->param('email');

        try{
            if (!$this->filled_out($_POST)) {
                throw new Exception('信息未填完整！请把信息填完整再注册！');
            }
            if (strlen($username) > 45){
                throw new Exception('用户名在15个字内!');
            }
            if ($passwd != $passwd2) {
                throw new Exception('密码不一致！请重新填写！');
            }
            if ((strlen($passwd) < 6) || (strlen($passwd) > 16)) {
                throw new Exception('密码是6到16位的数字或字母！');
            }
            if (!$this->valid_email($email)) {
                throw new Exception('邮箱错误！请正确填写！');
            }

            $passwd = sha1($passwd);
            $this->registeration($username, $passwd, $email);

            $this->success('注册成功！', 'index/index');
        }catch(Exception $e){
            $this->error('注册失败!'.$e->getMessage());
        }
    }
    private function filled_out($form_vars)
    {
        //判断是否为空
        foreach($form_vars as $key => $value){
            if((!isset($key)) || ($value == '')){
                return false;
            }
        }
        return true;
    }
    private function valid_email($address)
    {
        //判断是否为邮箱
        if(preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/', $address)){
            return true;
        }else{
            return false;
        }
    }
    private function registeration($username, $passwd, $email)
    {
        $datetime = date('Y-m-d H:i:s');
        $result = Db::table('player_information')
                  ->where('username', $username)
                  ->select();

        if(count($result) > 0){
            throw new Exception('该用户已存在！请重新注册!');
        }

        $row = array();
        $row[0]['username'] = $username;
        $row[0]['password'] = $passwd;
        $row[0]['email'] = $email;
        $row[0]['registertime'] = $datetime;
        $row[0]['status'] = '未登录';
        
        $row[1]['name'] = $username;
        $row[1]['npg'] = '';
        $row[1]['goband'] = sprintf('%09d', 0);
        $row[1]['white_block'] = '';
        
        Db::table('player_information')->insert($row[0]);
        Db::table('game')->insert($row[1]);
    }
    public function home()
    {
        Db::table('player_information')
            ->where('username', Session::get('valid_user'))
            ->update(['status' => '已登录']);
            
        return $this->fetch();
    }
    public function logout()
    {
        Db::table('player_information')
            ->where('username', Session::get('valid_user'))
            ->update(['status' => '未登录']);
        
        Session::set('valid_user', null);
        $this->success('退出成功！', 'index/index');
    }
    public function games()
    {
        $game_list = array();
        $game_list[0] = (['2048', '五子棋', '别踩白块', '2048', '五子棋', 'www', '2048', '五子棋', 'www', '2048', '五子棋', 'www', '2048', '五子棋', 'www', '2048', '五子棋', 'www', '2048', '五子棋', 'www', '2048', '五子棋', 'www', 24]);
        $game_name = input('game_name');
        $this->assign('game_list', $game_list);
        $this->assign('game_name', $game_name);
        return $this->fetch();
    }
    public function sort()
    {
        return $this->fetch();
    }
    public function personal()
    {
        $display_info = array();
        $display_info['indetity'] = '游客';
        $display_info['status'] = '未登录';
        $display_info['email'] = '无';
        
        if(Session::has('valid_user')){
            $result = Db::table('player_information')
                      ->where('username', Session::get('valid_user'))
                      ->select();
                  
            $display_info['indetity'] = $result[0]['indetity'];
            $display_info['status'] = $result[0]['status'];
            $display_info['email'] = $result[0]['email'];
        }
        
        $this->assign('display_info', $display_info);
        return $this->fetch();
    }
}
