<?PHP
/*
    create of entity user of DB (mygame). 
    Son los datos que se van a mapear.
*/
class User{
    private $iduser;
    private $nickname;
    private $points;

    // get and set
    public function __GET($k){ return $this->$k; }
    public function __SET($k, $v){ return $this->$k = $v; }
}
?>