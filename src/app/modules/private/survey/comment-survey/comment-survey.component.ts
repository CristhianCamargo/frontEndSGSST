import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-survey',
  templateUrl: './comment-survey.component.html',
  styleUrls: ['./comment-survey.component.css']
})
export class CommentSurveyComponent implements OnInit {

  public commentsArray: any[] = [];
  page_number: number = 1;
  page_size: number = 10;

  constructor(public customerService: CustomerService, public commentService: CommentService) { }

  ngOnInit(): void {
    this.getComment();
  }

  getComment() {
    this.customerService.getCustomer("/comment/").subscribe((res) => {
      this.commentsArray = res.comment;
    });
  }

  deleteComment(comment_id: number) {
    Swal.fire({
      title: '¿Esta seguro de eliminar este comentario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteComment(comment_id).subscribe((message) => {
          if (message = "OK") {
            console.log('🤗');
            this.getComment();
            Swal.fire('Eliminado', '', 'success')
          } else {
            console.log('😥', "Ocurrio un error");
            Swal.fire('Hubo un error', '', 'error')
          }
        })

      }
    })

  }

  deleteAllComments(){
    Swal.fire({
      title: '¿Esta seguro de borrar todos los comentarios?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteAllComment().subscribe((message) => {
          if (message = "OK") {
            console.log('🤗');
            this.getComment();
            Swal.fire('Comentarios eliminados', '', 'success')
          } else {
            console.log('😥', "Ocurrio un error");
            Swal.fire('Hubo un error', '', 'error')
          }
        })

      }
    })
  }

}
