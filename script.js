		var can = document.getElementById('gra');
		var ctx = can.getContext('2d');
		var GrafikaPlatformy = new Image();
		GrafikaPlatformy.src = 'img/cloud.png';
		var plat = [];
		/* (x y wys szer) */
		plat[0] = new Platforma(0, 500,750, 80);
		plat[1] = new Platforma(730, 500,750, 80);
		plat[2] = new Platforma(100, 250,100, 40);
		plat[3] = new Platforma(240, 360,100, 40);
		plat[4] = new Platforma(500, 430,100, 40);
		plat[5] = new Platforma(380, 180,100, 40);
		plat[6] = new Platforma(730, 300,100, 40);
		plat[7] = new Platforma(670, 100,100, 40);
		plat[8] = new Platforma(1000, 390,100, 40);
		plat[9] = new Platforma(200, 70,100, 40);
		plat[10] = new Platforma(1160, 320,100, 40);
		plat[11] = new Platforma(910, 160,100, 40);
		
		var GrafikaMonety = new Image();
		GrafikaMonety.src = 'img/star.png';
		var mon = [];
		mon[0] = new Moneta(130, 205, 45,40);
		mon[1] = new Moneta(270, 315,45,40);
		mon[2] = new Moneta(530, 385,45,40);
		mon[3] = new Moneta(410, 135,45,40);
		mon[4] = new Moneta(760, 255,45,40);
		mon[5] = new Moneta(700, 55,45,40);
		mon[6] = new Moneta(1030, 345,45,40);
		mon[7] = new Moneta(230, 25,45,40);
		mon[8] = new Moneta(1190, 275,45,40);
		var przesz = [];
		
		przesz[0] = new Przeszkoda(420, 40,35, 40, 100, 'img/ogień.png');
		przesz[1] = new Przeszkoda(920, 300,35, 40, 100, 'img/ogień.png');
		przesz[2] = new Przeszkoda(420, 340,35, 40, 100, 'img/ogień.png');
		
		var Grafikapostaci = new Image();
		Grafikapostaci.src = 'img/angel.png'
		var xPos = 10;
		var yPos = 20;
		var szerPos = 70;
        var wysPos = 70;
		var hp = 100;
		var wysSkok = 180;
		var licznik = 0;
		
		function Platforma (px, py, pszer, pwys)
		{
		    this.x = px;
			this.y = py;
			this.szer = pszer;
			this.wys = pwys;
		}
		
		function rysyjplatformy()
		{
		    for (var i = 0;i<plat.length;i++)
			{
			    ctx.drawImage(GrafikaPlatformy, plat[i].x, plat[i].y, plat[i].szer, plat[i].wys);
			}
        }
		
		function Moneta (px, py, pszer, pwys)
		{
		    this.x = px;
			this.y = py;
			this.szer = pszer;
			this.wys = pwys;
			this.czywidoczna = true;
		}
		
		function rysujmonety()
		{
			for (var i = 0;i<mon.length;i++)
			{
			    if (mon[i].czywidoczna == true)
				{
					ctx.drawImage(GrafikaMonety, mon[i].x, mon[i].y, mon[i].szer, mon[i].wys);
				}
			}
		}
		
		function Przeszkoda (px, py, pszer, pwys, pzabiera, pnazwa)
		{
		    this.x = px;
			this.y = py;
			this.szer = pszer;
			this.wys = pwys;
			this.czywidoczna = true;
			this.zabiera = pzabiera;
			this.GrafikaPrzeszkody = new Image();
			this.GrafikaPrzeszkody.src = pnazwa;
		}
		
		function rysujprzeszkody()
		
		{
			for (var i = 0;i<przesz.length;i++)
			{
			    if (przesz[i].czywidoczna == true)
				{
					ctx.drawImage(przesz[i].GrafikaPrzeszkody, przesz[i].x, przesz[i].y, przesz[i].szer, przesz[i].wys);
				}
			}
		}
		
		var dy = 0;
		function grawitacja()
		{
			if (dy >= 0)
			{
						dy = 3;
			for (var i=0; i<plat.length; i++)
            {
				if(yPos + wysPos > plat[i].y &&
                 yPos + 0.8*wysPos < plat[i].y &&
                 xPos + szerPos/2 > plat[i].x &&
                 xPos + szerPos/2 <plat[i].x + plat[i].szer)
                {
                    dy = 0;
                }
			}
			}
			else
			{
				licznik = licznik + 3;
				if (licznik >= wysSkok)
				{
					dy = 0;
					licznik = 0;
				}
			}
			yPos = yPos + dy;
		}
		
		document.addEventListener('keydown',ruchPostaci, false);
		var dx = 0;
		function ruchPostaci(e)
		{
			if(e.keyCode == 37)
            {
                dx = -2;
            }
            else if(e.keyCode == 39)
            {
                dx = 2;
            }
			else if(e.keyCode == 38 && dy == 0)
            {
                dy = -3;
            }
		}
		
		document.addEventListener('keyup', stop, false);

        function stop(e)
        {
            if(e.keyCode == 37)
            {
                dx = 0;
            }
            else if(e.keyCode == 39)
            {
                dx = 0;
            }
        }
		
		function kolizjaZMoneta()
		{
			for (var i=0; i<mon.length; i++)
            {
				if(yPos < mon[i].y + mon[i].wys/2 &&
                 yPos + wysPos > mon[i].y + mon[i].wys/2 &&
                 xPos < mon[i].x + mon[i].szer/2&&
                 xPos + szerPos > mon[i].x + mon[i].szer/2)
                {
                    mon[i].czywidoczna = false;
                }
			}
		}
		

		function kolizjaZPrzeszkoda()
		{
			for (var i=0; i<przesz.length; i++)
            {
				if(yPos < przesz[i].y + przesz[i].wys/2 &&
                 yPos + wysPos > przesz[i].y + przesz[i].wys/2 &&
                 xPos < przesz[i].x + przesz[i].szer/2&&
                 xPos + szerPos > przesz[i].x + przesz[i].szer/2 &&
				 przesz[i].czywidoczna == true)
                {
                    przesz[i].czywidoczna = false;
					hp = hp - przesz[i].zabiera;
					if (hp <= 0)
					{
						location.reload();
					}
				
                }
			}
		}
		
		function czyKoniec()
		{
			czySaMonety = false;
			for (var i=0; i<mon.length; i++)
            {
				if(mon[i].czywidoczna == true)
				{
				czySaMonety = true;
				}
			}
			if (czySaMonety == false)
			{
				ctx.clearRect(0,0,can.width,can.height);
				ctx.font = "120px Georgia";
				ctx.fillStyle  = "white";
				ctx.fillText("WYGRYWASZ", 200, 300);			
			}
		}

		
		function rysuj()
		{
			ctx.clearRect(0,0,can.width,can.height);
			rysyjplatformy();
			rysujmonety();
			rysujprzeszkody();
			ctx.drawImage(Grafikapostaci, xPos, yPos, szerPos, wysPos);
			grawitacja();
			xPos = xPos + dx;
			kolizjaZMoneta();
			kolizjaZPrzeszkoda();
			czyKoniec();
		}
		
		setInterval(rysuj, 10);