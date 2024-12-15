import { handleCreateProductAction } from "@/utils/actions";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const ProductCreate = (props: IProps) => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };
  const onFinish = async (values: any) => {
    values.detail = content;
    values.images = "[" + values.images + "]";
    //const userInfo = JSON.parse(values.images);
    console.log(values.images);
    console.log(values);
    values.images = JSON.parse(values.images);
    //.console.log(values);
    //  console.log(editorRef.current.getContent());
    const res = await handleCreateProductAction(values);
    if (res?.data) {
      handleCloseCreateModal();
      message.success("Create succeed!");
    } else {
      notification.error({
        message: "Create User error",
        description: res?.message,
      });
    }
  };
  const handleEditorChange = (content: any) => {
    setContent(content);
    console.log("Edited content:", content);
  };
  return (
    <Modal
      title="Add new Product"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="detail" name="detail">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="price" name="price">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>{" "}
          <Col span={24}>
            <Form.Item
              label="images"
              name="images"
              rules={[{ required: true, message: "Please input your images!" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Editor
            apiKey="cqin9xjepke2xb6a9rtqbj4263c47xen8hwuw3viahfm05bi"
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductCreate;
