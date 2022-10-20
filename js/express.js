var prevBtns = document.querySelectorAll('.btn-prev');
var nextBtns = document.querySelectorAll('.btn-next');
var progress = document.getElementById('progress');
var formSteps = document.querySelectorAll('.form-step');
var progressSteps  = document.querySelectorAll('.progress-step');



let formStepsNum = 0;

for (let index = 0; index < nextBtns.length; index++) {
  const element = nextBtns[index];

  // click sur un lien +1 à la variable 'formStepsNum' et on déclenche la fonction updateFormSteps() et updateProgressBar()
  element.addEventListener('click', function() {
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  })
}

for (let index = 0; index < prevBtns.length; index++) {
  const element = prevBtns[index];

  // click sur un lien -1 à la variable 'formStepsNum' et on déclenche la fonction updateFormSteps() et updateProgressBar()
  element.addEventListener('click', function() {
    formStepsNum--;
    updateFormSteps();
    updateProgressBar();
  })
}

function updateFormSteps() {
  // chaque elt(formSteps) on select celui qui a la class 'form-step-active' et on lui la retire
  formSteps.forEach( function(formStep) {
    formStep.classList.contains('form-step-active') && formStep.classList.remove('form-step-active');
  })

  // on ajoute la class 'form-step-active' au formSteps[formStepsNum+1]
  formSteps[formStepsNum].classList.add('form-step-active');
}

// cet fontion anime elt contenant le chiffre du niveau d'étape
function updateProgressBar() {
  progressSteps.forEach(function (progressStep,idx) {
    idx < formStepsNum+1 ? progressStep.classList.add('progress-step-active') : progressStep.classList.remove('progress-step-active');
  })
  var progressActive  = document.querySelectorAll('.progress-step-active');
  progress.style.width = ((progressActive.length -1 ) / (progressSteps.length - 1) * 100+'%');
}

$('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
      $(".file-upload").removeClass('active');
      $("#noFile").text("No file chosen..."); 
    }
    else {
      $(".file-upload").addClass('active');
      $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
    }
  });

   function addRow(btn) { 
        //Total Baris
        const table = document.querySelector(".table-items");
        const totalRowCount = table.rows.length;
        const total_baris = totalRowCount-1;

        $('.table-items > tbody:last-child').append(`
            <tr>
                <td>
                    <div class='mx-1 my-2'>
                        <input name='id[`+total_baris+`]' type='hidden' value='`+total_baris+`'>
                        <input type='number' class='form-control border-light' id='qty' name='qty[`+total_baris+`]' required placeholder='Masukkan Jumlah Box..' onkeyup='cek_qty(this)'>
                        <input name='total_qty[`+total_baris+`]' type='hidden'>
                    </div>
                </td>
                <td>
                    <div class='mx-1 my-2'>
                        <input type='number' class='form-control border-light' id='weight' name='weight[`+total_baris+`]' required autocomplete='off' placeholder='Masukkan Berat Per-Box..' onkeyup='cek_berat(this)' disabled='true'>
                        <input name='total_berat[`+total_baris+`]' type='hidden'>
                    </div>
                </td>
                <td>
                    <div class='mx-1'>
                        <input type='number' class='form-control border-light' id='long' name='long[`+total_baris+`]' required autocomplete='off' placeholder='Masukkan Panjang..' onkeyup='cek_panjang(this)' disabled='true'>
                        <input name='total_panjang[`+total_baris+`]' type='hidden'>
                    </div>
                </td>
                <td>
                    <div class='mx-1'>
                        <input type='number' class='form-control border-light' id='width' name='width[`+total_baris+`]' required autocomplete='off' placeholder='Masukkan Lebar..' onkeyup='cek_lebar(this)' disabled='true'>
                        <input name='total_lebar[`+total_baris+`]' type='hidden'>
                    </div>
                </td>
                <td>
                    <div class='mx-1'>
                        <input type='number' class='form-control border-light' id='height' name='height[`+total_baris+`]' required autocomplete='off' placeholder='Masukkan Tinggi..' oninput='get_total(this,`+total_baris+`)' disabled='true'>
                        <input name='total_tinggi[`+total_baris+`]' type='hidden'>
                    </div>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleterow(this,`+total_baris+`)"><i class="fas fa-trash m-0"></i></button>
                </td>
            </tr>`
            );
    }

    function deleterow(btn,btn_id) {
        const table = document.querySelector(".table-items");
        const totalRowCount = table.rows.length;
        const total_baris = totalRowCount-2;
        var volume_real = 0;
        var actual_real = 0;

        var displayValue = document.getElementById('items-manual').style.display;
        //excel
        if(displayValue == 'none'){
            const table_manual = document.querySelector(".table-items-excel");
            const totalRowCount_manual = table_manual.rows.length;
            const total_baris_manual = totalRowCount_manual - 2;
            if(total_baris_manual === 0){
                $("#employee_table").hide();
                $("#items-manual").show();
                document.getElementById('qty').value = '';
                document.getElementById('weight').value = '';
                document.getElementById('height').value = '';
                document.getElementById('long').value = '';
                document.getElementById('width').value = '';
                document.getElementById("id").setAttribute('name', 'id[0]');
                document.getElementById("qty").setAttribute('name', 'qty[0]');
                document.getElementById("weight").setAttribute('name', 'weight[0]');
                document.getElementById("height").setAttribute('name', 'height[0]');
                document.getElementById("long").setAttribute('name', 'long[0]');
                document.getElementById("width").setAttribute('name', 'width[0]');
            }
            console.log(total_baris_manual);
        }

        console.log(total_baris);

        var row_id = btn_id;

        var row = $(btn).closest('tr');
        var jumlah = $(row).find("input[name='qty["+row_id+"]']").val();
        var berat = $(row).find("input[name='weight["+row_id+"]']").val();
        var tinggi = $(row).find("input[name='height["+row_id+"]']").val();
        var panjang = $(row).find("input[name='long["+row_id+"]']").val();
        var lebar = $(row).find("input[name='width["+row_id+"]']").val();

        var total_qty = document.getElementById('hidden-qty').value;
        var total_berat = document.getElementById('hidden-berat').value;
        var total_tinggi = document.getElementById('hidden-tinggi').value;
        var total_panjang = document.getElementById('hidden-panjang').value;
        var total_lebar = document.getElementById('hidden-lebar').value;

        document.getElementById('hidden-qty').value = total_qty - jumlah;
        document.getElementById('hidden-berat').value = total_berat - berat;
        document.getElementById('hidden-tinggi').value = total_tinggi - tinggi;
        document.getElementById('hidden-panjang').value = total_panjang - panjang;
        document.getElementById('hidden-lebar').value = total_lebar - lebar;

        var actual = (total_qty - jumlah) * (total_berat - berat);
        var volume = (total_qty - jumlah) * ((total_panjang - panjang) * (total_lebar - lebar) * (total_tinggi - tinggi)) / 4000;
        actual_real += jumlah * berat;
        volume_real += jumlah * (panjang * lebar * tinggi) / 4000;


        //console.log("-- QTY Hapus: "+jumlah);
        //console.log("-- Berat Hapus: "+berat);
        //console.log("-- Total QTY: "+(total_qty - jumlah));
        //console.log("-- Total Berat: "+(total_berat - berat));

        $.ajax({
            type: "POST",
            url: "https://xpdcargo.id/login/API/calculate_shipment",
            data: {alamat_pengirim: $("#alamat-pengirim").val(), alamat_penerima:$("#alamat-penerima").val(), actual:actual, volume:volume},
            dataType: "json",
            success:function(response){
                document.getElementById('berat_aktual').value = response.berat_actual+"Kg";
                document.getElementById('berat_volume').value = response.berat_volume+"Kg";
                //document.getElementById('total_harga').value = "Rp. "+addCommas(response.total_harga);
            }
        });

        $(btn).closest("tr").remove();
    }
