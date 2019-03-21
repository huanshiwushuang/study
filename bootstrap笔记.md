1. **响应式首先定位需要兼容哪些屏幕尺寸，导入 @include sass 定义的混合器媒体查询**
   1. xs、sm、md、lg、xl 等作为混合器实参
   2. @include media-breakpoint-up
   3. @include media-breakpoint-down
   4. @include media-breakpoint-only
   5. @include media-breakpoint-between
2. **Bootstrap 使用 z-index 控制 z 轴，表示层级关系，有一系列默认值**
   1. \$zindex-dropdown: 1000 !default;
   2. \$zindex-sticky: 1020 !default;
   3. \$zindex-fixed: 1030 !default;
   4. \$zindex-modal-backdrop: 1040 !default;
   5. \$zindex-modal: 1050 !default;
   6. \$zindex-popover: 1060 !default;
   7. \$zindex-tooltip: 1070 !default;
3. **Bootstrap 采用 flex 构建，分为 12 列网格系统---请注意 flexbox 的限制和错误，例如无法将某些 HTML 元素用作 Flex 容器**
   1. 行是列的包装器，每列都有 padding（装订线）
   2. 在网格布局中，内容必须放在列中，只有列可以是行的直接子项。col 放在 row 中
   3. row 上应用 no-gutters 类，将会取消 col 的 padding（装订线）
   4. 网格断点基于最小宽度的媒体查询 即 min-width
4. **.container 容器大约占据宽度 90%，居中；.container-fluid 容器宽度 100%；**
   1. .container 容器会根据设备宽度，应用不同的 media。例如：宽度 >= 576，max-width 限制在 540px。  
      |              | 超小<576px           | 小 ≥576px | 中等 ≥768px | 大 ≥992px | 超大 ≥1200px |
      | :----------- | :------------------- | :-------- | :---------- | :-------- | :----------- |
      | 最大容器宽度 | 无（自动）           | 540px     | 720px       | 960px     | 1140px       |
      | 类前缀       | .col-                | .col-sm-  | .col-md-    | .col-lg-  | .col-xl-     |
      | 列数         | 12                   |
      | padding宽度  | 30px（每列左右15px） |
      | 嵌套         | 是                   |
      | 列排序       | 是                   |
5. class 展示：
   1. .w-100---width: 100%!important;
   2. .row---行
   3. .col---列的开头